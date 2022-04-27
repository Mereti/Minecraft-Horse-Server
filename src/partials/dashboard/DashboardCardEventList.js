import React, {useEffect, useRef, useState} from 'react';
import {get_request} from "../../service/api_requests";
import Button from "@material-tailwind/react/Button";
import moment from "moment";
import JoinEventModal from "../../components/Modals/Dashboard/JoinEventModal";
import k1 from "../../assets/img/kon.jpg";


function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
function DashboardCardEventList(user) {
  const [events,setEvents] = useState([{}])
  const [results,setResults] = useState([{}])
  const [event,setEvent] = useState([{}])
  const [eventList,setEventList] = useState([{}])
  const [openModal, setOpenModal] = useState(false)
  const cancelButtonRef = useRef(null)
  const forceUpdate = useForceUpdate();
  const buttonRef = useRef();

  useEffect(() => {
    // /get/eventlistgamer
    get_request(
        'http://127.0.0.1:8080/event/get/eventlistgamer',
        true
    ).then(response => {
      if(response.body.length > 0){
        console.log("eventList",response.body)
        setEventList(response.body)
      }
    })
    get_request(
        'http://127.0.0.1:8080/event/events',
        true
    ).then(response => {
      if(response.body.length > 0){
        let arrayEv = response.body.filter(x => x.end === false);
            setEvents(arrayEv);
      }
    })
    get_request(
        'http://127.0.0.1:8080/event/results',
        true
    ).then(response => {
      if(response.body.length > 0){
        setResults(response.body)
      }
    })
    forceUpdate();
  }, [user,openModal]);

  return (
      <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
        <JoinEventModal user={user} event = {event} openModal={openModal} setOpenModal={setOpenModal} cancelButtonRef={cancelButtonRef}/>
        <div>
          <div className="bg-white">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-2xl">Zawody</h2>
            </header>
            <div className="mt-4 mb-4 grid grid-cols-2 gap-4 items-center">
              {events.map((item) => {
                    return results.find(result => result.eventResultId !== item.eventId) !== undefined ?
                        <div className="card-horse-margin grid grid-cols-2 rounded overflow-hidden shadow-lg">
                          <img className="w-full hidden-elements-image" src={k1}/>
                          <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-gray-700">{item.eventType === undefined ? "" : item.eventType.eventTypeName}</div>
                            <div className="text-gray-700 text-left text-base ">
                              <span className="font-bold">Punkty: </span>{item.eventType === undefined ? "" : item.eventType.pointsScored}
                            </div>
                            <div className="font-bold text-left text-gray-700">Opis: </div>
                            <div className="flex  content-center text-left p-1 text-gray-700">
                               {item.eventType === undefined ? "" : item.eventType.description}
                            </div>
                            <div className="text-left text-gray-700">
                              <span className="font-bold">Data końcowa: </span>{moment(item.date).format('YYYY.MM.DD HH:mm')}
                            </div>
                            <div className="flex items-center  content-center text-left mt-4">
                              {eventList.find(result => user.user !== null && result.gamer === user.user.id && item.eventId === result.event.eventId) === undefined?
                                  <Button size="large" color="green" className="bg-lime-600" onClick={()=>{ setEvent(item); setOpenModal(true);}}>
                                    Dołącz
                                  </Button> :
                                  <Button size="small" color="red" className="bg-red-700 hover:bg-red-900">
                                    {eventList.find(result => user.user !== null && result.gamer === user.user.id && item.eventId === result.event.eventId).horse.name}
                                  </Button>
                              }
                            </div>
                          </div>
                        </div>: ""
                  }
              )}
            </div>
          </div>
        </div>
        <div >
          <div className="bg-white">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-2xl">Zawody zakończone</h2>
            </header>
            <div className="mt-4 mb-4 grid grid-cols-2 gap-4 items-center">
              {results.map((item) => {
                    return results.find(result => result.eventResultId !== item.eventId) !== undefined ?
                        <div className="card-horse-margin grid grid-cols-2 rounded overflow-hidden shadow-lg">
                          <img className="w-full hidden-elements-image" src={k1}  />
                          <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.eventId === undefined ? "" : item.eventId.eventType.eventTypeName}</div>

                            <div className="text-gray-700 text-left text-base">
                              <span className="font-bold">Punkty: </span> {item.eventId === undefined ? "" : item.eventId.eventType.pointsScored}
                            </div>

                            <div className="font-bold text-left text-gray-700">Opis: </div>
                            <div className="text-gray-700 text-left">
                              {item.eventId === undefined ? "" : item.eventId.eventType.description}
                            </div>
                            <div className="text-gray-700 text-left"><span className="font-bold">Data końcowa: </span> {item.eventId === undefined ? "" : moment(item.eventId.date).format('YYYY.MM.DD HH:mm')}</div>
                            <div className="text-gray-700 text-left"><span className="font-bold">Zwycięzcy: </span>{item.horseId !== undefined ? item.horseId.gamerStud.gamerId.nickname : ""}</div>
                          </div>
                        </div>: ""
                  }
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default DashboardCardEventList;
