import React from 'react';
import img2 from "../../assets/img/img2.jpg"
import k1 from "../../assets/img/k-1.jpg";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import Homestyle from "./Homestyle.css";

const Home = () => (
  <div data-testid="Home">
          <div className="relative bglim " >
              <div className="max-w-7xl mx-auto ">

                  <div className=" lg:h-screen relative  z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                      <HomeNavigation/>
                      <main className="main-content mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                          <div className="sm:text-center lg:text-left">
                              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                  <span className="block xl:inline text-white">Witamy na </span>{' '}
                                  <span className="block text-white xl:inline">MC Stud Server</span>
                              </h1>
                              <p className=" mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                  Chciałbyś wejść na serwer MC Stud Server?
                              </p>
                              <p className=" mt-1 text-base text-white sm:mt-2 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl lg:mx-0">
                                  Chcesz zarządzać swoją stadniną, nie tylko w grze Minecraft?
                              </p>
                              <p className=" mt-1 text-base text-white sm:mt-2 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl lg:mx-0">
                                  Dzięki panelowi możesz zarządzać nią z każdego miejsca, w którym się znajdujesz. Zaloguj się lub zarejestruj i sprawdź sam!
                              </p>
                              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                  <div className="rounded-md shadow">
                                      <a
                                          href="/login"
                                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white button-style md:py-4 md:text-lg md:px-10"
                                      >
                                          Zaloguj się
                                      </a>
                                  </div>
                                  <div className="mt-3 sm:mt-0 sm:ml-3">
                                      <a href="/register"
                                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white button-style md:py-4 md:text-lg md:px-10"
                                      >
                                          Zarejestruj się
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </main>
                  </div>
              </div>
              <div className="lg:h-screen lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                  <img
                      className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                      src={k1}
                      alt="Tło McStadnina"
                  />
              </div>
          </div>
          <div>

          </div>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
