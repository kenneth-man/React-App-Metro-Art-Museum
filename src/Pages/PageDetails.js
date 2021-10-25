import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import PageHeader from '../Components/PageHeader';
import PageItem from '../Components/PageItem';
import Loading from '../Components/Loading';
import galleryImage from '../Res/Images/gallery.png';
import starIcon from '../Res/Icons/star.svg';
import checkIcon from '../Res/Icons/check.svg';

const PageDetails = () => {
    const { pageDetailsData, fetchObjectData, chooseRandomObjectId, pageDetailsDepartmentData, 
        setPageDetailsDepartmentData, isPageDetailsInitialRender, favouritesData, setFavouritesData } = useContext(Context);
    const [pageDetailsDepartmentIds, setPageDetailsDepartmentIds] = useState([]);

    const fetchObjectIdsFromDepartment = async (department) => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${department}`);
            const data = await response.json();
            setPageDetailsDepartmentIds(data.objectIDs);
        } catch(error){
            console.log(error);
        }
    }

    const returnNAIfFalsyValue = (input) => {
        if(input){
            return input;
        } else {
            return 'N/A';
        }
    }

    const addToFavouritesOnClick = () => setFavouritesData([...favouritesData, pageDetailsData]);

    const alreadyAddedAlert = () => alert('This Item has already been added to your favourites!');

    const isAlreadyAdded = () => favouritesData.find(curr => curr.objectID === pageDetailsData.objectID);

    useEffect(() => {
        pageDetailsData.departmentId && !isPageDetailsInitialRender.current ? setPageDetailsDepartmentData([]) : isPageDetailsInitialRender.current = false;
    }, [pageDetailsData])

    useEffect(() => {
        if(pageDetailsDepartmentIds.length > 0 && pageDetailsDepartmentData.length < 20){
            fetchObjectData('department', pageDetailsDepartmentIds[chooseRandomObjectId(pageDetailsDepartmentIds.length)]);
        } else if(pageDetailsDepartmentData.length === 0) {
            fetchObjectIdsFromDepartment(pageDetailsData.departmentId);
        }    
    }, [pageDetailsDepartmentIds, pageDetailsDepartmentData])

    return (
        <div className='Page fw col'>
            {
                pageDetailsData ? 
                <div className='Page__section Page__details fw fh col' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${pageDetailsData.primaryImage ? pageDetailsData.primaryImage : galleryImage})`}}>
                    <PageHeader
                        heading={pageDetailsData.objectName ? pageDetailsData.objectName : pageDetailsData.displayName}
                        subheading={pageDetailsData.artistDisplayName ? pageDetailsData.artistDisplayName : 'Unknown Artist/s'}
                    />

                    {
                        pageDetailsData.departmentId ?
                        <div className='Page__list row'>
                            {
                                pageDetailsDepartmentData.length > 0 ?
                                pageDetailsDepartmentData.map((curr, index) => 
                                <PageItem
                                    key={index}
                                    fullData={curr} 
                                    objectName={curr.objectName} 
                                    image={curr.primaryImage} 
                                    artists={curr.artistDisplayName} 
                                    department={curr.department}
                                />
                                ) :
                                <div className='Page__section--large center'>
                                    <Loading/>
                                </div>
                            }
                        </div> :
                        <div className='Page__section--large fw'>
                            <div className='Page__details--grid fh fw'>
                                <h2>Credit Line: {returnNAIfFalsyValue(pageDetailsData.creditLine)}</h2>
                                <h2>Department: {returnNAIfFalsyValue(pageDetailsData.department)}</h2>
                                <h2>Culture: {returnNAIfFalsyValue(pageDetailsData.culture)}</h2>
                                <h2>Country: {returnNAIfFalsyValue(pageDetailsData.country)}</h2>
                                <h2>Region: {returnNAIfFalsyValue(pageDetailsData.country)}</h2>
                                <h2>Medium: {returnNAIfFalsyValue(pageDetailsData.medium)}</h2>
                                <h2>Date: {returnNAIfFalsyValue(pageDetailsData.objectDate)}</h2>
                                <h2>Repository: {returnNAIfFalsyValue(pageDetailsData.repository)}</h2>
                            </div>

                            <button className='Page__details--favourites row' onClick={isAlreadyAdded() ? alreadyAddedAlert : addToFavouritesOnClick}>
                                {
                                    isAlreadyAdded() ?
                                    <h3>Added to Favourites</h3> :
                                    <h3>Add to Favourites</h3>
                                }

                                {
                                    isAlreadyAdded() ?
                                    <img src={checkIcon} alt='check-icon' className='Page__details--icon'/> :
                                    <img src={starIcon} alt='star-icon' className='Page__details--icon'/>
                                }
                            </button>
                        </div>
                    }
                </div> :
                <div className='Page__section--large center'>
                    <Loading/>
                </div>
            }
        </div>
    )
}

export default PageDetails;