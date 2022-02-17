import React, {useRef, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import style from "./card.css";
import EventElementPanel from './EventElementPanel';


function DashboardCardPlayer({user}) {

    return (
        <div className="float-left flex flex-col col-span-full sm:col-span-12 xl:col-span-12">

            <div className="px-5 pt-5">
                <div className="flex-grow justify-center text-left p-3">
                    {/* Change the height attribute to adjust the chart height */}
                    <div className="mt-4 mb-4 grid grid-cols-4 gap-4 items-center ">
                        <div className="w-full cardstyle lg:w-auto rounded-lg bg-white mx-6 lg:mx-0 ">
                            <NavLink exact to="/panel/stajnia" title="Twoja stajnia">
                                <h2 className=" items-center my-6 ">
                                    <span >Twoja stajnia </span>
                                </h2>
                            </NavLink>
                        </div>
                        <div className="w-full cardstyle lg:w-auto rounded-lg bg-white mx-6 lg:mx-0">
                            <NavLink exact to="/panel/profil" title="Twoje konto">
                                <h2 className=" items-center my-6 ">
                                    <span>Twoje konto </span>
                                </h2>
                            </NavLink>
                        </div>
                        <div className="w-full cardstyle lg:w-auto rounded-lg bg-white mx-6 lg:mx-0">
                            <NavLink exact to="/panel/zawody" title="Zawody">
                                <h2 className=" items-center my-6 ">
                                    <span>Zawody</span>
                                </h2>
                            </NavLink>
                        </div>
                        <div className="w-full cardstyle lg:w-auto rounded-lg bg-white mx-6 lg:mx-0">
                            <NavLink exact to="/panel/sklep" title="Sklep">
                                <h2 className=" items-center my-6 ">
                                    <span>Sklep </span>
                                </h2>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 pt-5">
                <div className="flex-grow justify-center text-left p-3">
                    <div className="mt-4 mb-4 grid grid-cols-4 gap-4 items-center ">
                           <EventElementPanel
                               user={user}
                           />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCardPlayer;
