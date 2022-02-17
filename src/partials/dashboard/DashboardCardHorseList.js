import React, {useEffect, useState} from 'react';
import {get_request} from "../../service/api_requests";
import k2 from "../../assets/img/k-2.jpg";
import moment from "moment";
import card from "./card.css";

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
function DashboardCardHorseList(stud) {
  const [horses,setHorses] = useState([{}])
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if(stud !== null && stud.id !== null){
      get_request(
          'http://127.0.0.1:8080/horse/horses',
          true
      ).then(response => {
        if(response.body.length > 0){
          let horseArray = response.body.filter(x => x.gamerStud.gamerStudId === stud.stud.gamerStudId);
          setHorses(horseArray);
          forceUpdate();
        }
      })
    }
    forceUpdate();
  }, [stud]);
  return (

      <div className="flex flex-col col-span-full  sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
        <div >
          <div className="bg-white">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-2xl">Konie w twojej stadninie</h2>
            </header>
            <div className="mt-4 mb-4 grid grid-cols-2 gap-4 items-center">

              {horses.map((item) => {
                return horses.find(horses => horses.horseId !== item.horse) !== undefined ?
                        <div className="card-horse-margin grid grid-cols-2 rounded overflow-hidden shadow-lg ">
                          <img className="w-full hidden-elements-image" src={k2}/>
                          <div className="px-6 py-4">
                            <div className="font-bold text-gray-700 text-xl mb-4">{item.name}</div>
                            <div className="button-event-style font-medium mb-2 text-base">
                              {item.breed === undefined ? "" : item.breed.horseBreed}
                            </div>
                            <div className="text-left text-gray-700"><span className="font-bold">Wartość: </span>{item.value}</div>
                            <div className="text-left text-gray-700"><span className="font-bold">Głód: </span> {item.hungry}</div>
                            <div className="text-left text-gray-700"><span className="font-bold">Nawodnienie: </span> {item.thirst}</div>
                            <div className="text-left text-gray-700"><span className="font-bold">Wygląd: </span> {item.appearance}</div>
                            <div className="text-left text-gray-700"><span className="font-bold">Szybkość: </span> {item.fast}</div>
                          </div>
                        </div>:""
                  }
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default DashboardCardHorseList;
