import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import RestaurantComponent from '../components/RestaurantComponent'
import React from 'react';
import { joesFrontEndCookieParser } from './../services/authenticate';
import styled from 'styled-components';

//Graphql query for restaurants our user has liked previously.
const myCookies = joesFrontEndCookieParser(document.cookie);
const myUserId = myCookies.userId;
const getLikesQuery = gql`
{
  user(_id: ${myUserId}) {
    username
    restaurants {
      name
      display_address
      price
      rating
      review_count
      image_url
      _id
    }
  }
}
`;

const deleteLikeMutation = gql`
  mutation ($user_id: Int!, $rest_id: Int!) {
    deleteLike(user_id: $user_id, rest_id: $rest_id) {
      user_id
      rest_id
    }
  }
`;

const HistoryList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  padding: 0px 30px;
  border-left: 3px solid #db0a5b;
`

const HistoryTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
const HistoryTitle = styled.p`
  font-family: 'Didact Gothic', sans-serif;
  font-size: 40px;
`

const HistorySection = styled.div`
  padding: 0px 40px;
  animation-name: slideInRight;
  animation-duration: 1s;
  animation-fill-mode: both;

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }
  }
`
const Icon = styled.img`
  height: 50px;
  width: 50px;
  margin: 0px 10px;
`

const ReloadBtn = styled.button`
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  z-index: 1;
  color: hsl(236, 32%, 26%);
  background-color: white;
  border: 1px solid hsl(236, 32%, 26%);
  font-size: 12px;

  :hover {
    cursor: pointer;
    animation: jelly 0.5s;
    background-color: hsl(236, 32%, 26%);
    color: white;
    font-weight: bold;
  } 

  @keyframes jelly {
    0%,
    100% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.98, 1.03);
    }
    50% {
      transform: scale(1.03, 0.98);
    }
    75% {
      transform: scale(0.98, 1.03);
    }
}
`


const HistoryContainer = (props) => {
  const getLikes = props.getLikesQuery;
  const deleteLikeMutation = props.deleteLikeMutation;

  //no idea why this function errors out in line 47 but we added a refresh button in 48 to resolve
  const restaurantMapping = () => {
    if (getLikes.loading) {
      return <div>Loading</div>
    } else if (getLikes.error) {
      return(
      <React.Fragment>
        <div class="balls">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ReloadBtn onClick={() => location.reload()}>Reload</ReloadBtn>
      </React.Fragment>
      )} else {
      return getLikes.user.restaurants.map((rest) => (
        <RestaurantComponent
          {...rest}
          deleteLikeMutation={deleteLikeMutation}
          getLikesQuery={getLikesQuery}
          userId={myUserId}
          key={rest._id}
        />
      ));
    }
  }

  return (
    <HistorySection>
      <HistoryTitleWrapper>
        <Icon src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/heart-512.png" />
        <HistoryTitle>Favorites</HistoryTitle>
      </HistoryTitleWrapper>
      <HistoryList>
        {restaurantMapping()}
      </HistoryList>
    </HistorySection>
  )
};


//binds our query to the current container by adding the output to props.  The name property we assign determines the key in props  
//It's like redux when you use connect on map state to props and map dispatch to props
export default compose(
  graphql(getLikesQuery, { name: "getLikesQuery" }),
  graphql(deleteLikeMutation, { name: "deleteLikeMutation" }))
  (HistoryContainer);
