import React from 'react'
import { PopularShow } from '../interfaces/interfaces'
import ShowThumbnail from './ShowThumbnail'

type Props = {
  results: PopularShow[]
  title: string
}

const ShowsCollection = ({results,title}: Props) => {
   return (
     <div className="relative mx-auto mt-10 flex max-w-[1810px] flex-col space-y-2 px-8">
       <h2 className="select-none text-base font-semibold md:text-lg">
         {title}
       </h2>

       <div className="-m-2 flex space-x-6 overflow-y-hidden overflow-x-scroll p-2 scrollbar-hide ">
         {results.map((result) => (
           <ShowThumbnail key={result.id} result={result} />
         ))}
       </div>
     </div>
   )
}

export default ShowsCollection