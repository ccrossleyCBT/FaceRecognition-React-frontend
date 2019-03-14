import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {imageUrl === '' ? null : <img src={imageUrl} alt="face recognition" width='500px' height="auto" />}
            </div>
        </div>
    );
};

export default FaceRecognition;
