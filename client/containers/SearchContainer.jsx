import React, { useState } from 'react';
import RestaurantSearchResultComponent from './../components/RestaurantSearchResultComponent';
import { gql } from 'apollo-boost';
import Hit from '../components/HitComponent';
import algoliasearch from 'algoliasearch';
import { ApolloConsumer } from 'react-apollo';
import {
  InstantSearch,
  Hits,
  SearchBox,
} from 'react-instantsearch-dom';

import styled from 'styled-components';

const client = algoliasearch('54V98YN658', 'd4fd1c2bd8718edd438f6fc30b0e8c30');
const searchClient = algoliasearch('54V98YN658', '488d342c46cad2e1015749231a63eaf3');
const index = client.initIndex('yelp')

const SearchRestaurantsQuery = gql`
  query yelp(
        $name: String!,
        $zipcode: Int!
      ){
        yelp (name: $name, zipcode: $zipcode) {
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
  }`;

const query1 = SearchRestaurantsQuery;

const AddRestaurantMutation = gql`
  mutation {
    addRestaurant(
        rating: $rating,
        review_count: $review_count,
        yelp_id: $yelp_id,
        name: $name,
        display_address: $display_address,
        image_url: $image_url,
        url: $url,
        price: $price,
        latitude: $latitude,
        longitude: $longitude
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



const Restaurant = styled.div`
  border: none;
  background-color: white;
  width: 300px;
  transition: 0.3s;

  :hover {
    box-shadow: 1px 0px 10px grey;
    transform: scale(1.01);
  }
`

const SearchTitle = styled.h1`
  background-color: 020101;
  padding: 20px;
  color: #D0F8FF;
  text-shadow: 0 0 5px #A5F1FF, 0 0 10px #A5F1FF,
    0 0 20px #A5F1FF, 0 0 30px #A5F1FF,
    0 0 40px #A5F1FF;
  text-align: center;
  font: "Palatino";
  margin: 0;
  border: 5px solid black;
  animation: flicker 1.5s infinite alternate; 
`
const ResName = styled.span`
  background-color: 020101;
  color: #D0F8FF;
  margin: 0;
  padding: 10px;
`;
const Zip = styled.span`
  background-color: 020101;
  color: #D0F8FF;
  margin: 0;
  padding: 10px;
`;

const Padding = styled.div`
  background-color: 020101;
  padding: 10px;
  margin: 0px;
`;

const Input = styled.input`
  color: #005766;
  :hover {
    box-shadow: 1px 0px 10px grey;
    transform: scale(1.01);
  }
  `;

const Background = styled.div`
background-color: 020101;
`;

const Recent = styled.h2`
  color: #D0F8FF;
  text-shadow: 0 0 5px #A5F1FF, 0 0 10px #A5F1FF,
    0 0 20px #A5F1FF, 0 0 30px #A5F1FF,
    0 0 40px #A5F1FF;
  text-align: center;
  font: "Palatino";
`;



const SearchContainer = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [zipcode, setZipCode] = useState('');
  const [restName, setRestName] = useState('');

  const searchResultComponents = [];
  for (const restaurant of restaurantList) {
    searchResultComponents.push(
      <RestaurantSearchResultComponent
        key={restaurant.id}
        data={restaurant}
        addRestaurantMutation={AddRestaurantMutation}
      />
    )
  };

  return (
    <ApolloConsumer>
      {client => (
        <Background>
          <SearchTitle> Search</SearchTitle>
          <ResName>Restaurant Name: </ResName> <Input id="whereYouAteYoFoodsInput" onChange={(e) => setRestName(e.target.value)}></Input>
          <Zip>Zipcode: </Zip><Input id="zipcodeOfWhereYouEatYoFoodsInput" onChange={(e) => setZipCode(e.target.value)}></Input>

          <button
            id="yelpSearchButton"
            onClick={async () => {
              const { data } = await client.query({
                query: query1,
                variables: { name: restName, zipcode: parseInt(zipcode) }
              });
              setRestaurantList(data.yelp);
              index.addObjects(data.yelp, (err) => {
                if (err) return console.error(err)
              })
            }}>
            Search for restaurants
          </button>
          <Padding></Padding>
          <div id="searchContainer">
            {searchResultComponents}
          </div>

          <div>
            <Recent>Recently viewed</Recent>
            <InstantSearch indexName="yelp" searchClient={searchClient}>
              <div>
                <SearchBox />
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>

        </Background>
      )}
    </ApolloConsumer>
  )
};

export default SearchContainer;