import React from 'react';

const client = algoliasearch(
  '488d342c46cad2e1015749231a63eaf3',
  'd4fd1c2bd8718edd438f6fc30b0e8c30'
);

const RestaurantSearchResultComponent = (props) => {

  return (
    <div className="searchResult">
      <h4>{props.data.name}</h4>
      <h6>{props.data.location.display_address[0]}<br />
        {props.data.location.display_address[1]}</h6>
      <button onClick={() => { props.likeRestaurant(props.data) }}> Like </button>
    </div>);
}

export default RestaurantSearchResultComponent;
