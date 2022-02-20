import Image from 'next/image'
import React from 'react'

type Props = {}

const Brands = (props: Props) => {
  return (
    <section className="mx-auto mt-12 flex max-w-[1810px] flex-col items-center justify-center gap-6 px-8 lg:flex-row select-none">

      <div className="brand group">
        <Image src="/images/disnep.png" layout="fill" objectFit="cover" />
        <video autoPlay muted loop playsInline className="video-container">
          <source src="/videos/disney.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="brand group">
        <Image src="/images/pixar.png" layout="fill" objectFit="cover" />
        <video autoPlay muted loop playsInline className="video-container">
          <source src="/videos/pixar.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="brand group">
        <Image src="/images/marvel.png" layout="fill" objectFit="cover" />
        <video autoPlay muted loop playsInline className="video-container">
          <source src="/videos/marvel.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="brand group">
        <Image src="/images/starwars.png" layout="fill" objectFit="cover" />
        <video autoPlay muted loop playsInline className="video-container">
          <source src="/videos/star-wars.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="brand group">
        <Image
          src="/images/national-geographic.png"
          layout="fill"
          objectFit="cover"
        />
        <video autoPlay muted loop playsInline className="video-container">
          <source src="/videos/national-geographic.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}

export default Brands
