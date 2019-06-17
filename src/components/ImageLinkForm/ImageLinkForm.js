import React from 'react';
import './ImageLinkForm.scss';

const ImageLinkForm = ({ value, handleChange, handleSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className="center form pa4 br3 shadow-5">
                    <input
                        className="f4 pa2 w-70 center"
                        type="text"
                        value={value}
                        onChange={({ target }) => handleChange(target.value)}
                    />
                    <button
                        type="submit"
                        className='w-30 grow f4 link ph3 pv2 dib white bg-green'
                        onClick={() => handleSubmit(value)}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;