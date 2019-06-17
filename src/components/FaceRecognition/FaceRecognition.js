import React from 'react';
import './FaceRecognition.scss';
const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {imageUrl === '' ? null : <img id="inputImage" src={imageUrl} alt="face recognition" width='500px' height="auto" />}
                {boxes.map((box, idx) => (
                    <div
                        key={idx}
                        className="bounding-box"
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaceRecognition;
