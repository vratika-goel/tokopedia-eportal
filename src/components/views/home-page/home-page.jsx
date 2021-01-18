import React, { useState, useEffect } from "react";

import './home-page.scss';

import { MemoizedCarousel } from '../../shared/carousel/carousel';
import ProductCards from '../../product-cards/product-cards';

import { serviceCall } from '../../../utils/services/service';
import endpoint from '../../../utils/services/endpoints';

const Homepage = (props) => {

  const [page, setPage] = useState(1);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [productsDataLoading, setProductsDataLoading] = useState(true);
  const [carouselData, setCarouselData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const fetchCarouselData = () => {
    setCarouselLoading(true);
    const url = `${endpoint.BASE_URL}/home`;
    serviceCall(url)
      .then((data) => {
        setCarouselLoading(false);
        setCarouselData(data);
        props.passProductData(data);
      })
      .catch((error) => {});
  }

  const fetchProductsData = () => {
    setProductsDataLoading(true);
    const url = `${endpoint.BASE_URL}/products?page=${pageNum}`;
    serviceCall(url)
      .then((productsData) => {
        setProductsDataLoading(false);
        setProductsData(productsData.data);
      })
      .catch((error) => {});
  }

  const updatePageCount = () => {
    setPageNum(pageNum + 1);
  }

  const routeToProductWithId = (id) => {
    props.routeToProductWithId(id);
  }

  useEffect(() => {
    fetchCarouselData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNum]);

  return (
    <div className="homepage-wrapper">
      <MemoizedCarousel carouselLoading={carouselLoading} carouselData={carouselData}/>
      <ProductCards productsDataLoading={productsDataLoading} productsData={productsData} routeToProductWithId={routeToProductWithId}/>
      {productsData && productsData.length > 0 && <div className="homepage-wrapper_load-more">
        <button className="btn btn-secondary" onClick={updatePageCount}>Load More</button>
      </div>}
    </div>
  );
}

export default Homepage;