import React from 'react';
import UserMenu from './UserMenu';
import {NavLink,useLocation} from "react-router-dom";
import style from "./Header-style.css";

function Header({
    user,
    setUser
}) {
    const location = useLocation();
    const { pathname } = location;
  return (
    <header className="sticky bgck-col-footer top-0 bg-white border-b border-gray-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 ">
                <div className="flex">
                    <div className={`px-0 py-2 rounded-sm mb-0.5 last:mb-0 hidden-elements ${pathname === '/panel/' && 'inDashboard'} hidden-elements`} >
                        <NavLink exact to="/panel/" className={`block text-white truncate transition duration-150 ${pathname === '/'}`}>
                            <div className="flex items-center">
                                <span className="text-sm font-medium px-3 py-3 duration-200">Panel Główny</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className={`px-4 py-2 rounded-sm mb-0.5 last:mb-0 hidden-elements ${pathname.includes('/panel/stajnia') && 'inDashboard'}`}>
                        <NavLink exact to="/panel/stajnia" className={`block text-white truncate transition duration-150 ${pathname.includes('/panel/stajnia')}`}>
                            <div className="flex items-center">
                                <span className="text-sm font-medium px-3 py-3  duration-200">Twoja Stajnia</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className={`px-4 py-2 rounded-sm mb-0.5 last:mb-0 hidden-elements ${pathname.includes('/panel/profil') && 'inDashboard'}`}>
                        <NavLink exact to="/panel/profil" className={`block text-white  truncate transition duration-150 ${pathname.includes('/panel/profil')}`}>
                            <div className="flex items-center">
                                <span className="text-sm font-medium px-3 py-3  duration-200">Twoje konto</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className={`px-4 py-2 rounded-sm mb-0.5 last:mb-0 hidden-elements  ${pathname.includes('/panel/zawody') && 'inDashboard'}`}>
                        <NavLink exact to="/panel/zawody" className={`block text-white truncate transition duration-150  ${pathname.includes('/panel/zawody')}`}>
                            <div className="flex items-center hover:ring-white">
                                <span className="text-sm font-medium px-3 py-3  duration-200">Zawody</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className={`px-0 py-2 rounded-sm mb-0.5 last:mb-0 hidden-elements ${pathname === '/panel/sklep' && 'inDashboard'} hidden-elements`} >
                        <NavLink exact to="/panel/sklep" className={`block text-white truncate transition duration-150 ${pathname === '/panel/sklep'}`}>
                            <div className="flex items-center">
                                <span className="text-sm font-medium px-3 py-3 duration-200">Sklep</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="flex items-center">
                    <hr className="w-px h-6 bg-gray-200 mx-3" />
                    <UserMenu user={user}/>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header;
