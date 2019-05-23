import React from 'react';
import styled from 'styled-components';

const Restaurant = styled.div`
  font-family: 'Didact Gothic', sans-serif;
  border: 1px solid transparent;
  background-color: white;
  width: 300px;
  transition: 0.3s;
  border-radius: 6px;

  :hover {
    box-shadow: 1px 0px 10px grey;
    transform: scale(1.01);
  }
`

const RestaurantTitle = styled.p`
  background-color: 29335C;
  padding: 10px;
  color: white;
  text-align: center;
  margin: 10px 0px;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px;

`
const DeleteBtn = styled.button`
  padding: 10px;
  border-radius: 3px;
`

const Icon = styled.img`
  height: 20px;
  width: 20px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const RestaurantComponent = ({ _id, name, rating, display_address, price, review_count, deleteLikeMutation, getLikesQuery, userId }) => {
  return (
  <Restaurant>
    <RestaurantTitle>{name}</RestaurantTitle>
    <Info>
      <Row>
        {rating} 
        <Icon src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png"/>
      </Row>
      <p className="history-review-count">Review Count: {review_count}</p>
      <p className="history-price">Price: {price} </p>
      <p className="history-address">Address: {display_address} </p>
      <button
        onClick={() => {
          deleteLikeMutation({ variables: {
              user_id: parseInt(userId),
              rest_id: parseInt(_id)
            }, refetchQueries: [{ query: getLikesQuery }]
          });
        }}>
        Delete
      </button>
    </Info>
  </Restaurant>
 )
}

export default RestaurantComponent;
