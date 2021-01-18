import React from "react";
import { useHistory } from 'react-router-dom';

import './product-card.scss';

const ProductCard = (props) => {

  const history = useHistory();
  const { productData } = props;

  const routeToProduct = () => {
    props.routeToProductWithId(productData.id);
    history.push(`/pdp/${productData.id}`);
  }

  return (
    <div className="cards-wrapper">
      {productData && Object.keys(productData) && 
      <div className="cards-wrapper_container" onClick={routeToProduct}>
        <div className="cards-wrapper_container_top">
          <img className="cards-wrapper_container_top_product-img" src={productData.img} alt={productData.name}/>
        </div>
        <div className="cards-wrapper_container_bottom">
          <div className="cards-wrapper_container_bottom_left">
            <div className="cards-wrapper_container_bottom_left_details">
              <h1>{productData.name}</h1>
              <p>£{productData.price}</p>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default ProductCard;