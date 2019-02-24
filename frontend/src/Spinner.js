import React from 'react';
import './spinner.scss';

const Spinner = () => {
    return (
        <div style={{ width:'100%', height: '100%' }} className='lds-cube'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;