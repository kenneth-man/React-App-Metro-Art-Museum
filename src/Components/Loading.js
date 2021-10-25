import React from 'react';
import spinner from '../Res/Icons/spinner.gif';

const Loading = () => {
    return (
        <div className='row' style={{margin: 'auto'}}>
            <h2>Loading Items...</h2>

            &nbsp; &nbsp;

            <img src={spinner} alt='spinner'/>
        </div>
    )
}

export default Loading;