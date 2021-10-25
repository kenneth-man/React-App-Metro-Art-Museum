import React, { useContext } from 'react';
import { Context } from '../Context';
import PageHeader from '../Components/PageHeader';
import PageItem from '../Components/PageItem';
import Loading from '../Components/Loading';

const Favourites = () => {
    const { favouritesData } = useContext(Context);

    return (
        <div className='Page col'>
            <PageHeader
                heading='Favourites'
                subheading='Listed below are all the artworks that you have added to your favourites list'
            />

            <div className='Page__list row'>
                {
                    favouritesData.length > 0 ?
                    favouritesData.map((curr, index) => 
                        <PageItem
                            key={index}
                            fullData={curr}
                            objectName={curr.objectName}
                            image={curr.primaryImage}
                            artists={curr.artistDisplayName}
                            department={curr.department}
                            isOnFavourites={true}
                        />
                    ) :
                    <div className='Page__section--large center'>
                        <h2>No Items found in your favourites :(</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default Favourites;