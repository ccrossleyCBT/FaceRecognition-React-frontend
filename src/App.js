import React, { useState, useEffect } from 'react';
import Clarifai from 'clarifai';
import { API_KEY } from '../config';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const clarifai = new Clarifai.App({
  apiKey: API_KEY
});

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  });

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  }, []);

  const calcFaceLocations = (boundingBoxes) => {
    const image = document.getElementById('inputImage');
    const width = +image.width;
    const height = +image.height;

    return boundingBoxes.map(box => ({
      leftCol: box.left_col * width,
      topRow: box.top_row * height,
      rightCol: width - (box.right_col * width),
      bottomRow: height - (box.bottom_row * height)
    }));
  }

  const handleSubmit = async (value) => {
    setImageUrl(value);

    try {
      const res = await clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, value)
      if (res) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(res => res.json())
          .then(user => setUser(user));
      }

      const boundingBoxes = res.outputs.map(output => output.data.regions.map(region => region.region_info.bounding_box))[0];
      const faces = calcFaceLocations(boundingBoxes);

      setBoxes(faces);
    } catch (e) {
      throw e;
    }
  }

  const handleRouteChange = (route) => {
    if (route === 'signin') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className='App'>
      <Navigation isSignedIn={isSignedIn} handleRouteChange={handleRouteChange} />
      {route === 'home'
        ? (<>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm value={input} handleChange={setInput} handleSubmit={handleSubmit} />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </>)
        : (
          route === 'signin'
            ? <Signin handleRouteChange={handleRouteChange} setUser={setUser} />
            : <Register handleRouteChange={handleRouteChange} setUser={setUser} />
        )
      }
    </div>
  );
}

export default App;
