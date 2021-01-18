import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

import './product-description.scss';

const ProductDescription = (props) => {

  const history = useHistory();
  const { individualProductData, routeToHomeFlag } = props;

  useEffect(() => {
    if(routeToHomeFlag) {
      history.push(``);
    }
  }, [routeToHomeFlag, history])

  return (
    <main className="container">
      {
        individualProductData && individualProductData.img &&
        <div className="left-column">
          <img data-image="black" src={individualProductData.img} alt={individualProductData.name} />
        </div>
      }
      {
        individualProductData &&
        <div className="right-column">
          <div className="product-description">
            <h1>{individualProductData.name}</h1>
            <p>{individualProductData.description}</p>
          </div>
          <div className="product-configuration">
            <div className="product-color">
              <span>Rating: {individualProductData.rating} stars out of 5</span>
            </div>
            <span className="sr-only">Four out of Five Stars</span>
          </div>
          <div className="product-price">
            <span>{individualProductData.price}</span>
          </div>
        </div>
      }
    </main>
  )
}

export default ProductDescription;