import React, { Component, useState } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const clarifai = new Clarifai.App({
  apiKey: '4c45b5c3b77e46b999c97d5e55d8c325'
});

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (value) => {
    setImageUrl(value);

    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, value).then(
      function (response) {
        // do something with response
        const faceBoxes = response.outputs.map(output => output.data.regions.map(region => region.region_info.bounding_box));
        console.log(faceBoxes);
      },
      function (err) {
        // there was an error
        console.error(err);
      }
    );
  }
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm value={input} handleChange={setInput} handleSubmit={handleSubmit} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
