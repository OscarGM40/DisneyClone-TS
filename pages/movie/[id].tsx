import { PlusIcon, XIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import { Movie } from '../../interfaces/movie'

interface Props {
  movie: Movie
}

const Movie = ({ movie }: Props) => {
  // console.log(movie)
 const [session] = useSession()
  const BASE_URL = 'https://image.tmdb.org/t/p/original/'
  const router = useRouter()
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [])

  const index = movie.videos.results.findIndex(
    (element) => element.type === 'Trailer'
  )

  return (
    <div>
      <Head>
        <title>{movie.title || movie.original_title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)] ">
            <Image
              src={
                `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
                `${BASE_URL}${movie.poster_path}`
              }
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-y-28 inset-x-4 z-50 mb-1 space-y-6 md:inset-y-auto md:inset-x-12 md:bottom-10">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl ">
              {movie.title || movie.original_title}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5 ">
              <button className="flex items-center justify-center rounded bg-[#f9f9f9] py-2.5 px-6 text-xs text-black transition duration-200 hover:bg-[#c6c6c6] md:text-base">
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="ml-0.5 font-medium uppercase tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="flex items-center justify-center rounded border border-[#f9f9f9] bg-black/30 py-2.5 px-6 text-xs text-[#f9f9f9] transition duration-200 hover:bg-[#c6c6c6] md:text-base"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="ml-1.5 font-medium uppercase tracking-wide">
                  Trailer
                </span>
              </button>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-black/60 transition duration-200 hover:bg-black/30">
                <PlusIcon className="h-6 md:h-8" />
              </div>
              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-black/60 transition duration-200 hover:bg-black/30">
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>

            <p className="text-sm md:text-base">
              {movie.release_date || movie.first_air_date} •{' '}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m •{' '}
              {movie.genres.map((genre) => genre.name + ' ')}{' '}
            </p>
            <h4 className="max-w-4xl text-sm md:text-base lg:text-lg">
              {movie.overview}
            </h4>
          </div>

          {/* Bg Overlay todo el fondo*/}
          {showPlayer && (
            <div className="absolute inset-0 z-50 h-full w-full bg-black opacity-50 transition duration-200" />
          )}

          <div
            className={`absolute inset-x-[7%] top-3 overflow-hidden rounded-[10px] transition duration-1000 md:inset-x-[13%] ${
              showPlayer ? 'z-50 opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-between bg-black p-3.5 text-[#f9f9f9]">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full opacity-50 transition duration-200 hover:bg-[#0f0f0f] hover:opacity-75"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            {/* reproductor */}
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${movie.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                controls={true}
                playing={showPlayer}
                light={true}
              />
            </div>

          </div>
        </section>
      )}
    </div>
  )
}

export default Movie

interface ServerProps {
  movie: Movie
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const { id } = context.query
  const session = await getSession(context)

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json())

  return {
    props: {
      // id: id as string,
      session: session,
      movie: request,
    },
  }
}
