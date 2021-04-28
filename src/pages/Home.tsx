import React from 'react';
import { useHistory } from 'react-router-dom';

import CharactersImg from '../img/characters.png';
import ComicsImg from '../img/comics.png';
import StoriesImg from '../img/stories.png';

import '../styles/home.scss';

const Home = () => {
  const history = useHistory();
  return (
    <div className="home">
      <div className="home__images">
        <img
          src={CharactersImg}
          alt="characters"
          onClick={() => {
            history.push('/characters');
          }}
        />
      </div>
      <div className="home__images">
        <img
          src={ComicsImg}
          alt="comics"
          onClick={() => {
            history.push('/comics');
          }}
        />
      </div>
      <div className="home__images">
        <img
          src={StoriesImg}
          alt="stories"
          onClick={() => {
            history.push('/stories');
          }}
        />
      </div>
    </div>
  );
};

export default Home;
