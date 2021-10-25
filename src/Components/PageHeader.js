import React from 'react';

const PageHeader = ({ heading, subheading }) => {
    return (
        <div className='Page__section Page__section--small col'>
            <h1>{heading}</h1>

            <h2>{subheading}</h2>
        </div>
    )
}

export default PageHeader;