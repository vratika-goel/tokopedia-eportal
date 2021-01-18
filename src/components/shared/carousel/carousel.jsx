import React from "react";

import { MemoizedSpinner } from '../spinner/spinner.jsx';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './carousel.scss';

const CarouselEl = (props) => {

  const { carouselData } = props;

  return (
    <div className="carousel-wrapper">
      {
        carouselData.carousel && carouselData.carousel.length ?
        <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
          {carouselData.carousel.map(el => {
            return (
              <div key={el.title}>
                <img src={el.url} alt={el.title}/>
                <p className="legend">{el.title}</p>
              </div>
            )
          })}
        </Carousel> : <MemoizedSpinner />
      }
    </div>
  );
}

export const MemoizedCarousel = React.memo(CarouselEl);
