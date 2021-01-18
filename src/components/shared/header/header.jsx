import React from "react";

import './header.scss';
import constant from '../../../assets/constants/constant';

const Header = (props) => {
  const { productId } = props;

  const routeToHome = () => {
    props.routeToHome(true);
  }

  return (
    <div className="header">
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            {productId &&
              <span className="icon-back" onClick={routeToHome}>&lt;</span>
            }
            <a href="www.tokopedia.com">{constant.BRAND_NAME_START}
              <span>{constant.BRAND_NAME_END}</span>
            </a>
          </h1>

          <nav>
            <button className="btn btn-link" href="www.google.com">Home</button>
            <button className="btn btn-link" href="www.google.com">Blog</button>
            <button className="btn btn-link" href="www.google.com">Pricing</button>
            <button className="btn btn-link" href="www.google.com">About</button>
            <button className="btn btn-link" href="www.google.com">Faq</button>
            <button className="btn btn-link" href="www.google.com">Contact</button>
          </nav>

        </div>
      </header>
        
      <div className="header-fixed-placeholder"></div>
    </div>
  );
}

export const MemoizedHeader = React.memo(Header);

