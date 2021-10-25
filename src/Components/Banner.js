import React from 'react';
import { SocialIcons } from '../SocialIcons';

const Banner = ({ img, ID = null }) => {
    return (
        <div className='banner fw ctr' id={ID} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.9)), url(${img})`}}>
            {
                ID === 'banner-footer' ?
                <div className='fw fh row'>
                    <div className='wrapper fh col'>
                        <h1>The Met Fifth Avenue</h1>

                        <div className='col'>
                            <h2>1000 Fifth Avenue</h2>
                            <h2>New York, NY 10028</h2>
                            <h2>Phone: 212-535-7710</h2>
                        </div>
                    </div>

                    <div className='wrapper fh col'>
                        <h1>The Met Cloisters</h1>

                        <div className='col'>
                            <h2>99 Margaret Corbin Drive</h2>
                            <h2>Fort Tryon Park</h2>
                            <h2>New York, NY 10040</h2>
                            <h2>Phone: 212-923-3700</h2>
                        </div>
                    </div>

                    <div className='wrapper fh col'>
                        <h1>Follow us</h1>

                        <div className='col'>
                            <div className='row'>
                                {
                                    SocialIcons.map((curr, index) => 
                                        <a key={index} href={curr.url}>
                                            <img src={curr.icon} alt='social-icon' style={{height: '30px', marginRight: '10px'}}/>
                                        </a>
                                    )
                                }
                            </div>

                            <h2 style={{width: '90%'}}>© 2000–2021 The Metropolitan Museum of Art. All rights reserved.</h2>
                        </div>
                    </div>
                </div> :
                null
            }
        </div>
    )
}

export default Banner;