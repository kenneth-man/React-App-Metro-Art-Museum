import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import PageHeader from '../Components/PageHeader';
import PageItem from '../Components/PageItem';
import Loading from '../Components/Loading';

const Discover = () => {
    const { fetchObjectData, totalObjectIds, chooseRandomObjectId, discoverData } = useContext(Context);

    useEffect(() => {
        if(totalObjectIds && discoverData.length < 20) fetchObjectData('discoverData', totalObjectIds[chooseRandomObjectId(totalObjectIds.length)]);
    }, [totalObjectIds, discoverData])

    return (
        <div className='Page col'>
            <PageHeader
                heading='Discover'
                subheading='&ndash; &nbsp; Discover randomly selected items from the Metropolitan Art Museum &nbsp; &ndash;'
            />

            <div className='Page__list row'>
                {
                    discoverData.length > 0 ?
                    discoverData.map((curr, index) =>
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

export default Discover;