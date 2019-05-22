import React from 'react';

function RestaurantComponent ({ _id, name, rating, displayAddress, price, reviewCount, deleteLikeMutation, getLikesQuery, userId }) {
 return (
  <div className='history'>
    <strong>Name: </strong>{name}
    <br/>
    <strong>Rating: </strong>{rating}
    <br/>
    <strong>Review Count: </strong>{reviewCount}
    <br/>
    <strong>Price: </strong>{price}
    <br/>
    <strong>Address: </strong>{displayAddress}
    <button onClick={() => {
      deleteLikeMutation({
        variables: {
          user_id: parseInt(userId),
          rest_id: parseInt(_id)
        },
        refetchQueries: [{ query: getLikesQuery }]
      });
    }
    }>Delete</button>
  </div>
 )
}

export default RestaurantComponent; 