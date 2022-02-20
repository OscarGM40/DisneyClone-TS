import React from 'react'
import { getProviders, signIn, getSession, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { NextPageContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import Image from 'next/image'
import Head from 'next/head'
import Header from '../components/Header'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider > | null
}
/* recuerda mandar el csrfToken si uso envio de emails al user que quiere registrarse */
export default function SignIn({ providers }: Props) {
  return (
    <section>
      <Head>
        <title>Sign In | Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="relative min-h-[calc(100vh-72px)] ">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="absolute top-1/4 mx-auto -mt-6 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-3 p-8 sm:-mt-12 md:-mt-16">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
          />
          {Object.values(providers!).map((provider) => {
            if (provider.name === 'email') return null
            return (
              <div key={provider.name}>
                <button
                  className="w-full rounded bg-[#DB4437] py-4 px-6 text-xl
                font-extrabold uppercase tracking-wide transition duration-300
                hover:bg-[#e91907] hover:text-black "
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            )
          })}

          <p className="text-center text-base ">
            <span className="block mt-5 text-sm">
              ** This project has been
            carried out on a non-profit basis, for educational purposes and is
            not a complete functional application. **
              </span>
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  )
}


      {/* si uso un form propio debe apuntar aqui.Ejemplo: */}
      {/* <form method="post" action="/api/auth/signin/email"> */}
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
        {/* <label>
          Email address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form> */}

      /* para iterar sobre los providers debo usar este codigo */
      /* {Object.values(providers!).map((provider) => {
          if (provider.name === 'email') return null
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          )
      })} */
 
/* new Versions Next 9.5+*/
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const providers = await getProviders()
  return {
    props: { providers },
  }
} 

/* forma anterior a Next v9.5 */
/* SignIn.getInitialProps = async (ctx) => {
  const { req, res } = context
  const session = await getSession({ req })
  //  si hay una session redirecciono al home 
  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    })
    return res.end()
  }
  return {
    session: undefined,
    providers: await providers(context),
    // csrf es para email sending,si no voy a enviar emails puedo prescindir de ella 
    csrfToken: await csrfToken(context),
  }
} */