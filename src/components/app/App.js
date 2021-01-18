import React, { useState, useEffect }  from "react";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { MemoizedHeader } from '../shared/header/header';
import { MemoizedFooter } from '../shared/footer/footer';
import Homepage from '../views/home-page/home-page';
import ProductDescription from '../views/product-description/product-description';

import { serviceCall } from '../../utils/services/service';
import endpoint from '../../utils/services/endpoints';

import './App.scss';

const App = (props) => {

  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState(null);
  const [routeToHomeFlag, setRouteToHomeFlag] = useState(false);
  const [individualProductData, setIndividualProductData] = useState([]);

  const routeToProductWithId = (id) => {
    setProductId(id);
    setRouteToHomeFlag(false);
  }

  const setPassedData = (data) => {
    setProductData(data)
  }

  const checkForPreExistingParam = () => {
    const url = window.location.pathname;
    if(url.length > 5 && url.startsWith('/pdp/')) {
      const prodId = parseInt(url.slice(5));
      if(prodId) {
        setProductId(prodId);
      }
    } else {
      setProductId(null);
    }
  }

  const routeToHome = (routeBack) => {
    if(routeBack) {
      setProductId(null);
      setRouteToHomeFlag(true);
    } else {
      setRouteToHomeFlag(false);
    }
  }

  useEffect(() => {
    checkForPreExistingParam();
    setRouteToHomeFlag(false);
    if(productId) {
      const url = `${endpoint.BASE_URL}/products/${productId}`;
      serviceCall(url)
        .then((data) => {
          setIndividualProductData(data);
        })
        .catch((error) => {});
      }
  }, [productId])

  return (
    <div className="eportal-wrapper">
    <MemoizedHeader productId={productId} routeToHome={routeToHome}/>
    <Switch>
      <Route 
        exact
        path="/" 
        render={(props) => (
          <Homepage {...props} passProductData={setPassedData} routeToProductWithId={routeToProductWithId}/>
        )}
      />
      <Route 
        exact
        path="/pdp" 
        render={(props) => (
          <Homepage {...props} routeToProductWithId={routeToProductWithId}/>
        )}
      />
      <Route 
        path="/pdp/" 
        render={(props) => (
          <ProductDescription {...props} individualProductData={individualProductData} routeToHomeFlag={routeToHomeFlag}/>
        )}
      />
      <Redirect to="/" />
    </Switch>
    { productData && <MemoizedFooter /> }
    </div>
  );
}

export default App;
