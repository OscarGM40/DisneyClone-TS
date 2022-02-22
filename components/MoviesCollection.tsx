import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/solid'
import React, { useRef } from 'react'
import { PopularMovie } from '../interfaces/interfaces'
import MovieThumbnail from '../MovieThumbnail'

type Props = {
  results: PopularMovie[]
  title: string
}

const MoviesCollection = ({ results, title }: Props) => {
  const divRef = useRef<HTMLDivElement>()

  const handleClick = (size: number) => {
    if (divRef.current) {
      divRef.current.scrollTo({
        left: divRef.current.scrollLeft + size,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative mx-auto mt-10 flex max-w-[1810px] flex-col space-y-2 px-8">
      <h2 className="select-none text-base font-semibold md:text-lg">
        {title}
      </h2>

      <div
        ref={divRef}
        className="-m-[2] flex space-x-6 overflow-y-hidden overflow-x-scroll p-2 scrollbar-hide group mx-4"
      >
      <button className="hidden md:group-hover:inline">
        <ArrowCircleLeftIcon
          className="absolute left-13 z-50 h-10 w-10 cursor-pointer opacity-50 transition duration-200 hover:opacity-80 
           md:top-[50%]"
          onClick={() => handleClick(-800)}
        />
      </button>
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      <button className="hidden md:group-hover:inline">
        <ArrowCircleRightIcon
          className="absolute right-8 z-50 h-10 w-10 cursor-pointer opacity-50 transition duration-200 hover:opacity-80 md:top-[50%]"
          onClick={() => handleClick(800)}
        />
      </button>
      </div>

    </div>
  )
}

export default MoviesCollection
