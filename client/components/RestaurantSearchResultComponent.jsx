import React from 'react';

const searchClient = algoliasearch(
  '488d342c46cad2e1015749231a63eaf3',
  'd4fd1c2bd8718edd438f6fc30b0e8c30'
);

const RestaurantSearchResultComponent = (props) => {
  return (
    <div className="searchResult">
      {/* <h4>{props.data.name}</h4>
      <h6>{props.data.location.display_address[0]}<br />
        {props.data.location.display_address[1]}</h6>
      <button onClick={() => { props.likeRestaurant(props.data) }}> Like </button> */}
      <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
        <div>
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>);
}

const Hit = (props) => {
  return (
    <div>
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit.name} />
      </div>
      <div className="hit-rating">
        <Highlight attribute="rating" hit={props.hit.rating} />
      </div>
      <div className="hit-price">
        <Highlight attribute="price" hit={props.hit.price} />
      </div>
      <div className="hit-review-count">
        <Highlight attribute="review-count" hit={props.hit.reviewCount} />
      </div>
      <div className="hit-display-address">
        <Highlight attribute="display-address" hit={props.hit.displayAddress} />
      </div>
    </div>
  );
}

export default RestaurantSearchResultComponent;
