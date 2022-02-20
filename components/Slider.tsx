import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' 
import { Carousel } from 'react-responsive-carousel'


const Slider = () => {
  return (
    <section className="relative mt-7 shadow-2xl max-w-fit mx-auto select-none">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false} //quitar
        showIndicators={true} // bolitas del medio
        showThumbs={false} //thumbnails inferiores
        showArrows={false} // flechas de los lados
        interval={5000}
      >
      
        <div>
          <img loading='lazy' src="/images/slider-1.jpg" alt="slider-1" />
        </div>
      
        <div>
          <img loading='lazy' src="/images/slider-2.jpg" alt="slider-2" />
        </div>
      
        <div>
          <img loading='lazy' src="/images/slider-3.jpg" alt="slider-3" />
        </div>
        <div>
          <img loading='lazy' src="/images/slider-4.jpeg" alt="slider-4" />
        </div>

      </Carousel>
    </section>)
}

export default Slider