import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: papayawhip;
  border: 1px solid black;
`;

const Favorites = () => (
  <Wrapper>
    <div id="favorites-bar">
      <h1>Our Favorites</h1>
    </div>
  </Wrapper>
)

export default Favorites;
