import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { joesFrontEndCookieParser } from '../services/authenticate';
import { exGetLikes } from './../containers/HistoryContainer';
import styled from 'styled-components';

const myCookies = joesFrontEndCookieParser(document.cookie);
const myUserId = myCookies.userId;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px;
  background: radial-gradient(circle, rgba(255,199,0,0.8377120206489675) 0%, rgba(235,253,29,0.5486264749262537) 53%, rgba(252,176,69,0.11204830383480824) 100%);
  font-family: Helvetica;
  border: 1px solid #f2f2f2;
  padding: 14px;
  font-color: #333333;
  transition: 0.4s;

  :hover {
    box-shadow: 1px 0px 10px #4eb5f1;
    transform: scale(1.01);
  }
`
const restName = styled.p`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
`
const restAddress = styled.p`
  font-syze: 24px;
  font-weight: 600;
`

const restPrice = styled.p`
  font-syze: 24px;
  font-weight: 600;
`

const restRating = styled.p`
  font-syze: 24px;
  font-weight: 600;
`

const LikeButton = styled.button`
  display:inline-block;
   padding:0.3em 1.2em;
   margin:0 0.3em 0.3em 0;
   border-radius:2em;
   height: 20px;
   width: 50px;
   text-decoration:none;
   font-family:'Roboto',sans-serif;
   font-weight:300;
   color:#FFFFFF;
   background-color:#4eb5f1;
   text-align:center;
   transition: all 0.2s;

  hover: {
     background-color:#4095c6;
  }
`

const AddRestaurantMutation = gql`
  mutation ($rating: Float!, $review_count: Int!, $yelp_id: String!, $name: String!, $display_address: String!, $image_url: String!, $url: String!, $price: String!, $latitude: Float!, $longitude: Float!, $user_id: Int!){
    addRestaurant(
        rating: $rating,
        review_count: $review_count,
        yelp_id: $yelp_id,
        name: $name,
        display_address: $display_address,
        image_url: $image_url
        url: $url,
        price: $price,
        latitude: $latitude,
        longitude: $longitude
        user_id: $user_id
      ) {
      rating
      review_count
      yelp_id
      name
      display_address
      image_url
      url
      price
      latitude
      longitude
    }
  }
`



const RestaurantSearchResultComponent = (props) => {

  props.data.user_id = parseInt(myUserId);
  return (
    <Information>
      <restName><b>{props.data.name}</b></restName>
      <restAddress>
        <b>Address: </b>{props.data.display_address}
      </restAddress>
      <restPrice>
      <b>Price: </b>{props.data.price}
      </restPrice>
      <restRating>
      <b>Rating: </b>{props.data.rating}
      </restRating>
      <restReview>
      <b>Review count: </b>{props.data.review_count}
      </restReview>

      <LikeButton onClick={() => {
        props.AddRestaurantMutation({
          variables: props.data,
          // refetch: [{ query: getLikesQuery }]
        }, location.reload());
      }}>
      Like
      </LikeButton>
    </Information>
  )
}

export default compose(
  graphql(AddRestaurantMutation, { name: 'AddRestaurantMutation' })
)(RestaurantSearchResultComponent);