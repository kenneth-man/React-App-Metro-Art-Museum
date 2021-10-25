import React, { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import PageHeader from '../Components/PageHeader';
import PageItem from '../Components/PageItem';

const Search = () => {
    const { searchData, setSearchData, fetchObjectData } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchObjectIds, setSearchObjectIds] = useState([]);
    const [searchDataIndex, setSearchDataIndex] = useState(0);
    const isInitialRender = useRef(true);

    const fetchSearchObjectIds = async (string) => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${string}`);
            const data = await response.json();
            console.log(data);
            if(data) setSearchObjectIds(data.objectIDs);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        !isInitialRender.current ? (searchQuery !== '' ? fetchSearchObjectIds(searchQuery) : setSearchObjectIds([])) : isInitialRender.current = false;
    }, [searchQuery])

    useEffect(() => {
        if(searchObjectIds.length > 0) fetchObjectData('search', searchObjectIds[searchDataIndex]);
       
        if(searchObjectIds.length === 0 && searchDataIndex !== 0){
            setSearchDataIndex(0);
            setSearchData([]);
        } 
    }, [searchObjectIds, searchDataIndex])

    useEffect(() => {
        if(searchObjectIds.length > 0 && searchData.length < 20) setSearchDataIndex(searchDataIndex => searchDataIndex += 1);
    }, [searchData])

    return (
        <div className='Page col'>
            <PageHeader 
                heading='Search for Artworks'
                subheading='Type in a keyword that is contained within an artwork’s data'
            />

            <div className='Page__section--small center'>
                <input type='text' placeholder='e.g. Lorem Ipsum...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            </div>

            <div className='Page__list row'>
                {
                    searchData.length > 0 ?
                    searchData.map((curr, index) => 
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
                        <h2>No Artworks found...</h2>
                    </div>
                }
            </div>
            
        </div>
    )
}

export default Search;