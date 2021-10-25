import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import PageItem from './PageItem';
import Loading from './Loading';
import { ReactComponent as LeftArrowIcon } from '../Res/Icons/keyboard_arrow_left.svg';
import { ReactComponent as RightArrowIcon } from '../Res/Icons/keyboard_arrow_right.svg';

const Slider = () => {
    const { sliderData, totalObjectIds, fetchObjectData, chooseRandomObjectId } = useContext(Context);
    const [slides, setSlides] = useState([]);
    const [curSlide, setCurSlide] = useState(0);
    const [maxSlide, setMaxSlide] = useState(10);
 
    const moveSlides = () => {
        slides.forEach(curr => curr.style.transform = `translateX(${-850 * curSlide}px)`);
        activateDot(curSlide);
    }

    //determine next/previous 'curSlide'
    const nextPrevSlide = (direction) => {
        direction === 'next' ? 
        (curSlide === maxSlide - 1 ? setCurSlide(0) : setCurSlide(curSlide => curSlide + 1)) :
        (curSlide === 0 ? setCurSlide(maxSlide - 1) : setCurSlide(curSlide => curSlide - 1));
    }

    const activateDot = (slide) => {
        //reset active dots
        document.querySelectorAll('.dot').forEach(curr => curr.classList.remove('dot--active'));
        
        //display current slide's dot
        document.querySelector(`#dot-${slide}`).classList.add('dot--active');
    };
      
    useEffect(() => {
        if(totalObjectIds && sliderData.length < maxSlide) fetchObjectData('sliderData', totalObjectIds[chooseRandomObjectId(totalObjectIds.length)]);

        if(sliderData.length === maxSlide){
            setSlides(document.querySelectorAll('.Page__item')); 
            activateDot(curSlide);
        }  
    }, [totalObjectIds, sliderData]);

    useEffect(() => {
        if(sliderData.length === maxSlide) moveSlides();
    }, [curSlide])

    return (
        <div className='slider Page__section--medium center'>
            {
                sliderData.length === maxSlide ?
                <div className='slider__wrapper row fw fh'> 
                    {
                        sliderData.map((curr,index) => 
                            <PageItem
                                key={index}
                                fullData={curr}
                                objectName={curr.objectName}
                                image={curr.primaryImage}
                                artists={curr.artistDisplayName}
                                department={curr.department}
                            />
                        ) 
                    }
           
                    <button className='slider__arrow' id='previous' onClick={e => nextPrevSlide(e.currentTarget.id)}>
                        <LeftArrowIcon/>
                    </button> 
               
                    <button className='slider__arrow' id='next' onClick={e => nextPrevSlide(e.currentTarget.id)}>
                        <RightArrowIcon/>
                    </button> 

                    <div className='dots'>
                        {
                            sliderData.map((curr, index) => 
                                <button key={index} className="dot" id={`dot-${index}`} onClick={() => setCurSlide(index)}/>
                            )
                        }
                    </div> 
                </div> :
                <Loading/>
            }
        </div>
    )
}

export default Slider;