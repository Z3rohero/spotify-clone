import { Link } from 'react-router-dom';
import Search from './Search'
import HomeIcon from '../assets/icons/HomeIcon';
import SpotifyIcon from '../assets/icons/SpotifyIcon';

const Nav = () => {
    return (
        <header className='w-full flex justify-between p-2 h-16 items-center'>
            <Link to="/">
                <SpotifyIcon width={36} height={36} />
            </Link>
            <div className='flex gap-2 items-center h-full'>
                <Link className='bg-tertiary-dark flex items-center justify-center h-full aspect-square rounded-full text-neutral hover:scale-105' to="/dashboard"><HomeIcon/></Link>
                <Search />
            </div>
            <div className='w-6 h-6'>
                <button></button>
            </div>
        </header>
    ) 
}

export default Nav;