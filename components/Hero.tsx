import { signIn } from 'next-auth/client'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'


const Hero = () => {
  return (
    <section>
      <Head>
        <title>Log In | Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-[calc(100vh-72px)] ">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="absolute top-1/4 mx-auto -mt-6 sm:-mt-12 md:-mt-16 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-3 p-8">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
          />
          <button
            className="w-full rounded bg-blue-600 py-4 px-6 text-xl font-extrabold uppercase tracking-wide transition duration-200 hover:bg-[#0485ee]"
            onClick={() => signIn()}
          >
            Get all there
          </button>
          <p className="text-center portrait:text-sm  landscape:text-base ">
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $
          </p>
          <Image src="/images/cta-logo-two.png" width="600" height="70" objectFit="contain" />
        </div>
      </div>
    </section>
  )
}

export default Hero
