import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='w-full flex justify-between px-32 py-6 bg-slate-400'>
            <div className='w-1/2'>
               <Link to={'/'}>
                <h1>transactBoard</h1>
               </Link>
            </div>
            <div className='w-1/2'>
                <ul className='w-full flex justify-evenly'>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/stats'}>Statistics</Link></li>
                    <li><Link to={'/charts'}>Charts</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar