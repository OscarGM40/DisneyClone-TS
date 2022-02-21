import Image from 'next/image'
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const Header = () => {
 const [session] = useSession()
  const router = useRouter()


  return (
    <header className="sticky top-0 z-[1000] flex h-[72px] items-center bg-[#040714] px-10 md:px-12 select-none">
      <Image
        src="/images/logo.svg"
        width="85"
        height="85"
        alt="Disney+"
        className="cursor-pointer"
        onClick={() => router.push('/')}
      />

      {session && (
        <div className="ml-14 hidden items-center space-x-6 lg:flex">
          <a className="header-link group" onClick={() => router.push('/')}>
            <HomeIcon className="h-5" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            <SearchIcon className="h-5" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-5" />
            <span className="span">Watchlist</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-5" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-6" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-6" />
            <span className="span">Series</span>
          </a>
        </div>
      )}

      {!session ? (
        <button
          className="ml-auto rounded border px-4 py-1.5 text-base font-medium uppercase tracking-widest transition duration-200 hover:bg-white hover:text-black"
          /* si signIn va con un arg iré directo a su launcher */
          /* si no abre el provider en la pagina actual */
          onClick={() => signIn()}
        >
          Login
        </button>
      ) : (
        <img
          src={session.user?.image! || session.user?.image!}
          alt=""
          onClick={() => signOut()}
          className="ml-auto h-[54px] w-[54px] cursor-pointer rounded-full object-cover"
        />
      )}
    </header>
  )
}

export default Header

