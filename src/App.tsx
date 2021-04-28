import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Characters from './pages/Characters';
import Comics from './pages/Comics';
import Stories from './pages/Stories';
import Layout from './components/Layout';
import HeaderProvider from './context/GlobalContext';
import CharacterInfo from './pages/CharacterInfo';
import ComicInfo from './pages/ComicInfo';
import StoryInfo from './pages/StoryInfo';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Route exact path="/">
            <Home />
          </Route>
          <HeaderProvider>
            <Route exact path="/characters">
              <Characters />
            </Route>
            <Route exact path="/characters/:characterId">
              <CharacterInfo />
            </Route>
            <Route exact path="/comics">
              <Comics />
            </Route>
            <Route exact path="/comics/:comicId">
              <ComicInfo />
            </Route>
            <Route exact path="/stories">
              <Stories />
            </Route>
            <Route exact path="/stories/:storyId">
              <StoryInfo />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
          </HeaderProvider>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
