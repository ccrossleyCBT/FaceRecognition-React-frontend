import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.scss'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"><img style={{ paddingTop: '25%' }} src={brain} alt="brain" /></div>
            </Tilt>
        </div>
    )
}

export default Logo;