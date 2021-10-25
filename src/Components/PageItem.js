import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import logo from '../Res/Images/logo.png';
import crossIcon from '../Res/Icons/close.svg';

const PageItem = ({ fullData, objectName, image, artists, department, isOnFavourites = false }) => {
    const { setPageDetailsData, favouritesData, setFavouritesData } = useContext(Context);

    const pageItemOnClick = () => setPageDetailsData(fullData);

    const pageItemDeleteFavOnClick = () => {
        setFavouritesData(favouritesData.filter(curr => curr.objectID !== fullData.objectID));
    }

    const pageItemOnMouseEvent = () => document.querySelector(`#page-item-${fullData.objectID}`).classList.toggle('hidden');
    
    return (
        <Link 
            to={`/PageDetails/${objectName}`} 
            className='Page__item col' 
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${image ? image : logo})`}}
            onClick={pageItemOnClick}
            onMouseOver={isOnFavourites ? pageItemOnMouseEvent : null} 
            onMouseOut={isOnFavourites ? pageItemOnMouseEvent : null}>

            <h1>{objectName}</h1>

            <h2>{artists ? artists : 'Unknown Artist/s'}</h2>

            <h3>{department ? department : 'Department N/A'}</h3>

            {
                isOnFavourites ?
                <div className='Page__item--modal center fw fh hidden' id={`page-item-${fullData.objectID}`}>
                    <button className='button__modal fw fh col' onClick={pageItemDeleteFavOnClick}>
                        <h2>Remove from Favourites?</h2>
                    
                        <img src={crossIcon} alt='' style={{marginLeft: '10px', width: '40px'}}/>
                    </button>
                </div> :
                null
            }
        </Link>
    )
}

export default PageItem;