import React from 'react'
import { PopularMovie } from '../interfaces/interfaces'
import MovieThumbnail from '../MovieThumbnail';

type Props = {
  results: PopularMovie[] 
  title: string
}

const MoviesCollection = ({results,title}: Props) => {
  
  return (
    <div className="relative flex flex-col space-y-2 mt-10 px-8 max-w-[1810px] mx-auto">
      <h2 className="font-semibold text-base md:text-lg select-none">{title}</h2>

      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2 ">
        {results.map(result => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}

export default MoviesCollection