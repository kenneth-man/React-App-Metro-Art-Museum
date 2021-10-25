import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Res/Images/logo.png';

const Navbar = () => {
    return (
        <div className='navbar row fw'>
            <Link to='/' exact='true' className='link'>
                <img src={logo} alt='logo' style={{height: '75px'}}/>
            </Link>

            <div className='row' style={{width: '45%', justifyContent: 'space-between'}}>
                <NavLink to='/Departments' exact={true} activeClassName='navlink--active' className='navlink'>Departments</NavLink>
                <NavLink to='/Discover' exact={true} activeClassName='navlink--active' className='navlink'>Discover</NavLink>
                <NavLink to='/Recents' exact={true} activeClassName='navlink--active' className='navlink'>Recents</NavLink>
                <NavLink to='/Search' exact={true} activeClassName='navlink--active' className='navlink'>Search</NavLink>
                <NavLink to='/Favourites' exact={true} activeClassName='navlink--active' className='navlink'>Favourites</NavLink>
            </div>
        </div>
    )
}

export default Navbar;