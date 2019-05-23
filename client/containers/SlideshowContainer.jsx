import React from 'react';
import { Slide } from 'react-slideshow-image';
import { gql } from 'apollo-boost';
import {
	graphql,
	compose
} from 'react-apollo';

const SearchRestaurantsQuery = gql`
  { 
		 yelp (name: "chinese", zipcode: 10013) {
			 image_url,
			 name
     }
	}`;

const properties = {
	duration: 3000,
	transitionDuration: 500,
	infinite: true,
	indicators: true,
	arrows: true
}

const Slideshow = (props) => {
	const slideImages = [];
	const slideNames = [];
	if (props.loading) {
		"loading..."
	} else {
		if (props.SearchRestaurantsQuery.yelp !== undefined) {
			props.SearchRestaurantsQuery.yelp.forEach(x => {
				slideImages.push(x.image_url)
			})
			slideImages[2] = 'https://res.cloudinary.com/cloudimgts/image/upload/v1558644549/ezgif.com-resize.gif'
			props.SearchRestaurantsQuery.yelp.forEach(x => {
				slideNames.push(x.name)
			})
			slideNames[2] = 'THE CANT BE BOTHA\'D BISTRO'
		}
	}

	return (
		<Slide {...properties}>
			<div className="each-slide">
				<div className="slide-image"
					style={{ 'backgroundImage': `url(${slideImages[0]})`, }}>
					<span className="slide-span">{slideNames[0]}</span>
				</div>
			</div>
			<div className="each-slide">
				<div className="slide-image"
					style={{
						'backgroundImage': `url(${slideImages[1]})`,
						'backgroundRepeat': 'no-repeat',
						'height': '500px'
					}}>
					<span className="slide-span">{slideNames[1]}</span>
				</div>
			</div>
			<div className="each-slide">
				<div className="slide-image"
					style={{
						'backgroundImage': `url(${slideImages[2]})`,
						'backgroundRepeat': 'no-repeat',
						'height': '500px'
					}}>
				</div>
				<span className="slide-span">{slideNames[2]}</span>
			</div>
		</Slide>
	)
}

export default compose(
	graphql(SearchRestaurantsQuery, { name: 'SearchRestaurantsQuery' })
)(Slideshow);