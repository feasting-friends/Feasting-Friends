import React from 'react';
import styled from 'styled-components';

const Restaurant = styled.div`
  font-family: 'Didact Gothic', sans-serif;
  border: 1px solid transparent;
  background-color: white;
  width: 300px;
  transition: 0.3s;
  border-radius: 6px;
  box-shadow: 0.4px 0px 10px grey;
  padding: 20px;

  :hover {
    box-shadow: 1px 0px 10px grey;
    transform: scale(1.05);
  }
`

const RestaurantTitle = styled.span`
  color: #29335C;
  font-size: 35px;

  position: relative;
  z-index: 1;

  ::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: -0.25em;
    right: -0.25em;
    background-color: hsla(341, 97%, 59%, 0.75);
    transform-origin: center right;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  } 

  :hover::before {
    transform: scaleX(1);
    transform-origin: center left;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px;
`
const DeleteBtn = styled.button`
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

const Icon = styled.img`
  height: 20px;
  width: 20px;
  animation: flip 2s infinite;

  @keyframes flip {
    50% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(180deg) rotateX(180deg);
    }
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Rating = styled.span`
  color: #26c281;
  font-weight: bold;
`

const FoodImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 6px;
  transform: rotate(0);
`

const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RestaurantComponent = ({ _id, name, rating, image_url, display_address, price, review_count, deleteLikeMutation, getLikesQuery, userId }) => {
  return (
  <Restaurant>
    <TitleWrapper>
      <RestaurantTitle>{name}</RestaurantTitle>
      <DeleteBtn
          onClick={() => {
            deleteLikeMutation({ variables: {
                user_id: parseInt(userId),
                rest_id: parseInt(_id)
              }, refetchQueries: [{ query: getLikesQuery }]
            });
          }}>
          Delete
        </DeleteBtn>
      </TitleWrapper>
      <BodyWrapper>
        <Row>
            <FoodImage src={image_url} />
          </Row>
        <Info>
          <Row>
            <span>{rating}</span>
            <Icon src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png"/>
          </Row>
          <Row>
            <Rating>{price}</Rating>
          </Row>
          <Row>
            {display_address}
          </Row>
        </Info>
      </BodyWrapper>
  </Restaurant>
 )
}

export default RestaurantComponent;
