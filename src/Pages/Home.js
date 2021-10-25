import React from 'react';
import Banner from '../Components/Banner';
import Slider from '../Components/Slider';
import bannerImg from '../Res/Images/banner2.png';

const Home = () => {
    return (
        <div className='Page col'>
            <div className='Page__section Page__section--medium col'>
                <h1>The Metropolitan Museum of Art</h1>

                <h2>&ndash; &nbsp; About the Museum &nbsp; &ndash;</h2>

                <p>
                    The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. 
                    The Museum lives in two iconic sites in New York City—The Met Fifth Avenue and The Met Cloisters. Millions of people also take part in The Met experience online.

                    Since its founding in 1870, The Met has always aspired to be more than a treasury of rare and beautiful objects. 
                    Every day, art comes alive in the Museum's galleries and through its exhibitions and events, revealing new ideas and unexpected connections across time and across cultures.
                </p>
            </div>

            <Slider/>

            <Banner img={bannerImg}/>

            <div className='Page__section Page__section--medium col'>
                <h2>&ndash; &nbsp; Mission Statement &nbsp; &ndash;</h2>

                <p>
                    The Met was founded on April 13, 1870, "to be located in the City of New York, for the purpose of establishing and maintaining in said city a Museum and library of art, of encouraging and developing the study of the fine arts, 
                    and the application of arts to manufacture and practical life, of advancing the general knowledge of kindred subjects, and, to that end, of furnishing popular instruction."
                </p>

                <p>
                    This statement of purpose has guided the Museum for over 140 years.

                    On January 13, 2015, the Trustees of The Metropolitan Museum of Art reaffirmed this statement of purpose and supplemented it with the following statement of mission:

                    "The Metropolitan Museum of Art collects, studies, conserves, and presents significant works of art across all times and cultures in order to connect people to creativity, knowledge, and ideas."
                </p>
            </div>
        </div>
    )
}

export default Home;