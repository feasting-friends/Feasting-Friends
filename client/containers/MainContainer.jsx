import React from 'react';
import SearchContainer from './SearchContainer';
import HistoryContainer from './HistoryContainer';
import Favorites from '../components/Favorites'

const MainContainer = () => (
  <div id="MainContainer" >
    <Favorites />
    <SearchContainer />
    <HistoryContainer />
  </div>
);

export default MainContainer;
