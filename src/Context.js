import React, { createContext, useState, useEffect, useRef } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [departmentsData, setDepartmentsData] = useState({departments: []});
    const [discoverData, setDiscoverData] = useState([]);
    const [recentsData, setRecentsData] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [pageDetailsData, setPageDetailsData] = useState(undefined);
    const [pageDetailsDepartmentData, setPageDetailsDepartmentData] = useState([]);
    const [favouritesData, setFavouritesData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [totalObjectIds, setTotalObjectIds] = useState(0);
    const [recentTotalObjectIds, setRecentTotalObjectIds] = useState(0);
    const isPageDetailsInitialRender = useRef(true);

    const fetchObjectData = async (stateName, id) => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            const data = await response.json();
            
            if(stateName === 'sliderData') setSliderData([...sliderData, data]);
            if(stateName === 'discoverData') setDiscoverData([...discoverData, data]);
            if(stateName === 'recentsData') setRecentsData([...recentsData, data]);
            if(stateName === 'department') setPageDetailsDepartmentData([...pageDetailsDepartmentData, data]);
            if(stateName === 'search') setSearchData([...searchData, data]);
        } catch(error){
            console.log(error);
        }
    }

    const fetchTotalObjectIds = async (date = null) => {
        try {
            let response;

            date ?
            response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`) :
            response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`);

            const data = await response.json();

            date ?
            setRecentTotalObjectIds(data.objectIDs):
            setTotalObjectIds(data.objectIDs);
        } catch(error){
            console.log(error);
        }
    }
    
    const chooseRandomObjectId = numOfIds => Math.ceil(Math.random() * numOfIds);

    useEffect(() => fetchTotalObjectIds(), []);

    return (
        <Context.Provider value={{ discoverData, sliderData, departmentsData, recentsData, pageDetailsData, totalObjectIds, recentTotalObjectIds, pageDetailsDepartmentData, 
            isPageDetailsInitialRender, favouritesData, searchData,
            fetchObjectData, fetchTotalObjectIds, setDepartmentsData, setTotalObjectIds, setPageDetailsData, setPageDetailsDepartmentData, setFavouritesData, chooseRandomObjectId,
            setSearchData }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;

//https://metmuseum.github.io/

//Search functionality (if no search api query parameter, just load data and filter() based on search string)