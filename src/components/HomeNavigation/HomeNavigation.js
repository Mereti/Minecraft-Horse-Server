import React, {Component, Fragment} from "react";
import {Popover, Transition} from "@headlessui/react";
import logo from "../../assets/img/logomc.png";
import MenuIcon from "@heroicons/react/outline/MenuIcon";
import XIcon from "@heroicons/react/outline/XIcon";
import "./HomeNavigation.scss";


class HomeNavigation extends Component {
    constructor() {
        super();
        this.state = {
            name: "HomeNavigation"
        };
    }

    render() {
        const navigation = [
            { name: 'Strona Główna', href: '/', title: "example title",  needLogin: false},
        ]
        const isLogged = true;
        return (
            <Popover>
                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                         aria-label="Global">
                        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                            <div className="flex items-center justify-between w-full md:w-auto">
                                <a href="/">
                                    <span className="sr-only">McHorse</span>
                                    <img
                                        className="h-16 w-auto sm:h-30"
                                        src={logo}
                                        alt="Logo McStadnina"/>
                                </a>
                            </div>
                        </div>

                    </nav>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                        <div
                            className="rounded-lg shadow-md bg-primary ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="px-5 pt-4 flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt="Logo McStadnina"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button
                                        className="bg-primary rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                        <span className="sr-only">Zamknij menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <a
                                href="/login"
                                className="block w-full px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
                            >
                                Zaloguj się
                            </a>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        );
    }
}
export default HomeNavigation;
