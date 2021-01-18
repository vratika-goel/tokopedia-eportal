import React from "react";

import { MemoizedSpinner } from '../shared/spinner/spinner';
import ProductCard from '../product-card/product-card';
import './product-cards.scss';

const ProductCards = (props) => {

  const { productsData } = props;

  const routeToProductWithId = (id) => {
    props.routeToProductWithId(id);
  }

  return (
    <div className="products-wrapper">
      {productsData && productsData.length ?
        productsData.map(product => {
          return (
            <ProductCard key={product.id} productData={product} routeToProductWithId={routeToProductWithId}/>
          )
        }) : <MemoizedSpinner />
      }
      </div>
  );
}

export default ProductCards;