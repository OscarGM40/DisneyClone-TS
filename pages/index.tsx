import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import Brands from '../components/Brands'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MoviesCollection from '../components/MoviesCollection'
import ShowsCollection from '../components/ShowsCollection'
import Slider from '../components/Slider'
import { PopularMovie, PopularShow } from '../interfaces/interfaces'

type HomeProps = {
  session: Session | null
  popularMovies: PopularMovie[]
  popularShows: PopularShow[]
  top_ratedMovies: PopularMovie[]
  top_ratedShows: PopularShow[]
}

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}: HomeProps) {

  const [session] = useSession()

  return (
    <div className="">
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {!session ? (
        <Hero />
      ) : (
        <main className="relative min-h-screen after:absolute after:inset-0 after:z-[-1] after:bg-home after:bg-cover after:bg-fixed after:bg-center after:bg-no-repeat mb-5 ">
          <Slider />
          <Brands />
          <MoviesCollection 
            results={popularMovies}
            title="Popular Movies" />
          <ShowsCollection 
            results={popularShows}
            title="Popular Shows" />
          <MoviesCollection 
            results={top_ratedMovies}
            title="Top Rated Movies" />
          <ShowsCollection 
            results={top_ratedShows}
            title="Top Rated Shows" />
        </main>
      )}
    </div>
  )
}

type ServerProps = {
  session: Session | null
  popularMovies: PopularMovie[]
  popularShows: PopularShow[]
  top_ratedMovies: PopularMovie[]
  top_ratedShows: PopularShow[]
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  ctx
) => {
  //  no confundir getSession con useSession
  const session = await getSession(ctx)

  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
  ] = await Promise.all([
    fetch(
      `${process.env.API_URL}/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `${process.env.API_URL}/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `${process.env.API_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `${process.env.API_URL}/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ])

  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatedShowsRes.json(),
    ])
  /* results devuelve un array de 20 resultados por pagina */
  return {
    props: {
      session: session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  }
}
