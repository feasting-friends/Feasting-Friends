import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
} from 'react-instantsearch-dom';
import Hit from './../components/HitComponent';

const searchClient = algoliasearch(
  '54V98YN658',
  '488d342c46cad2e1015749231a63eaf3'
);

const SearchContainer = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const queryYelpAPI = () => {
    const data = {
      name: document.querySelector('#whereYouAteYoFoodsInput').value,
      zip: document.querySelector('#zipcodeOfWhereYouEatYoFoodsInput').value
    }

    fetch(`http://localhost:3000/yelp/restaurantName/${data.name}/restaurantZip/${data.zip}`,
      { method: 'GET' })
      .then(resp => {
        console.log('resp', resp);
        return resp.json()
      }
      ).then(res2 => {
        setRestaurantList(res2);
      });
  };

  function likeRestaurant(data) {
    console.log('yo data here:', data);
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => {
      console.log('We have received a response from the server about liking a restaurant:');
      console.log(resp);
      if (resp.status === 200) setRestaurantList([]);
      else console.log('There was an error!');
    }).then(() => location.reload())
      .catch(err => console.error(err));
  };

  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    searchResultComponents.push(
      <RestaurantSearchResultComponent
        key={restaurant.id}
        data={restaurant}
        likeRestaurant={likeRestaurant.bind(this)}
      />
    )
  };

  return (
    <div>
      <InstantSearch indexName="yelp" searchClient={searchClient}>
        <div>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
      {/*
        <h1> Search</h1>
        Restaurant Name: <input id="whereYouAteYoFoodsInput"></input>
        Zipcode: <input id="zipcodeOfWhereYouEatYoFoodsInput"></input>
        <button id="yelpSearchButton" onClick={queryYelpAPI}> Search for restaurants </button>
        <div id="searchContainer">{searchResultComponents}</div>
       */}
    </div>
  );
};

export default SearchContainer;
