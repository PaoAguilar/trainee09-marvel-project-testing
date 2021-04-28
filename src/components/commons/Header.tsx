import React from 'react';
import { useHistory } from 'react-router-dom';

import '../../styles/header.scss';

const Header = () => {
  const history = useHistory();
  return (
    <>
      <div className="header">
        <div
          className="header__buttons"
          onClick={() => {
            history.push('/characters');
          }}
        >
          Characters
        </div>
        <div
          className="header__buttons"
          onClick={() => {
            history.push('/comics');
          }}
        >
          Comics
        </div>
        <div
          className="header__buttons"
          onClick={() => {
            history.push('/stories');
          }}
        >
          Stories
        </div>
        <div
          className="header__buttons"
          onClick={() => {
            history.push('/bookmarks');
          }}
        >
          Bookmarks
        </div>
      </div>
    </>
  );
};

export default Header;
