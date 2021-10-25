import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import PageHeader from '../Components/PageHeader';
import PageItem from '../Components/PageItem';
import Loading from '../Components/Loading';

const Recents = () => {
    const { recentsData, fetchObjectData, fetchTotalObjectIds, recentTotalObjectIds, chooseRandomObjectId } = useContext(Context);
    const date = new Date();
    
    useEffect(() => fetchTotalObjectIds(date.toISOString().slice(0, 10)), []);

    useEffect(() => {
        if(recentTotalObjectIds && recentsData.length < 20) fetchObjectData('recentsData', recentTotalObjectIds[chooseRandomObjectId(recentTotalObjectIds.length)]);
    },[recentTotalObjectIds, recentsData])

    return (
        <div className='Page col'>
            <PageHeader
                heading='Recents'
                subheading='Take a look at new artworks submitted to the Metropolitan Art Museum only a week ago'
            />

            <div className='Page__list row'>
                {
                    recentsData.length > 0 ?
                    recentsData.map((curr, index) => 
                        <PageItem
                            key={index}
                            fullData={curr}
                            objectName={curr.objectName}
                            image={curr.primaryImage}
                            artists={curr.artistDisplayName}
                            department={curr.department}
                        />
                    ) :
                    <Loading/>
                }
            </div>
        </div>
    )
}

export default Recents;