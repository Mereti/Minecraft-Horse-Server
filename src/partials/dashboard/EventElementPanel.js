import React, {useEffect, useRef, useState} from 'react';
import {get_request} from "../../service/api_requests";
import moment from "moment";
import style from "./card.css";
import k1 from "../../assets/img/kon.jpg";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
function EventElementPanel(user) {
    const [events,setEvents] = useState([{}])
    const [results,setResults] = useState([{}])
    const [event,setEvent] = useState([{}])
    const [eventList,setEventList] = useState([{}])


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
                setEvents(response.body)
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
    }, [user]);
    return (
        <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <div >
                    <div className="bg-white">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-800 text-2xl">Zawody</h2>
                        </header>
                        <div className="mt-4 mb-4 grid grid-cols-2 gap-4 items-center">

                            {events.map((item) => {
                                return results.find(result => result.eventResultId !== item.eventId) !== undefined ?
                                    <div className="card-horse-margin grid grid-cols-2 rounded overflow-hidden shadow-lg">
                                        <img className="w-full hidden-elements-image" src={k1}  />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{item.eventType === undefined ? "" : item.eventType.eventTypeName}</div>
                                        <div className="text-gray-700 text-base">
                                            {item.eventType === undefined ? "" : "Punkty: " + item.eventType.pointsScored}
                                        </div>
                                        <div>Data końcowa: {moment(item.date).format('YYYY.MM.DD HH:mm')}</div>
                                        <div className="mt-2">
                                            <a className="  items-center border border-transparent text-base font-medium rounded-md bg-white button-event-style "
                                               href="./zawody">Przejdź do zawodów</a>
                                        </div>
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

export default EventElementPanel;
