import React from 'react'
import githubIcon from '../assets/github.svg'
const Navbar = () => {
  return (
    <>
      <nav className='bg-slate-800 '>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5 text-white ">

          <div className="logo font-bold text-white text-2xl">
            <span className="text-green-700">
              &lt;
            </span>
            Pass
            <span className="text-green-700">
              man/ &gt;
            </span>
          </div>
          {/* <ul>
            <li className='flex gap-4'>
              <a className='hover:font-bold' href="#">Home</a>
              <a className='hover:font-bold' href="#">About</a>
              <a className='hover:font-bold' href="#">Contact</a>
            </li>
          </ul> */}
          <div className="flex items-end gap-3">
            <img className='invert ' src={githubIcon} alt="" />
            <span className="">Github</span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar