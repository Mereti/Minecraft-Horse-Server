import React, {useEffect, useRef, useState} from 'react';
import {get_request} from "../../service/api_requests";
import CreateStudModal from "../../components/Modals/Dashboard/CreateStudModal";
import DashboardCardHorseList from "./DashboardCardHorseList";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function GamerStudCard({user}) {
    const [stud,setStud] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const cancelButtonRef = useRef(null)
    const forceUpdate = useForceUpdate();

    const loadStuds = () => {
        if(user !== null && user.id !== null){
            get_request(
                'http://127.0.0.1:8080/stud/studs',
                true
            ).then(response => {
                if(response.body.length > 0){
                    setStud(response.body.find(x => x.gamerId !== null && x.gamerId.gamerId === user.id))
                }
            })
        }
    }

    useEffect(() => {
        loadStuds();
        forceUpdate();
    }, [user]);
    return (
        <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="px-5">
                <div className="flex-grow justify-center text-left p-3">
                    {CheckStud(stud,user,openModal,setOpenModal,cancelButtonRef,loadStuds)}
                </div>
            </div>
        </div>
    );
}
function CheckStud(stud,user,openModal,setOpenModal,cancelButtonRef,loadStuds){
    console.log("studExists", stud)
    if(stud === undefined || Object.keys(stud).length === 0){
        return(
            <div className="sm:grid grid-cols-1 sm:space-x-4">
                <CreateStudModal
                    user = {user}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    cancelButtonRef={cancelButtonRef}
                    forceUpdatePage = {loadStuds}
                />
                <div className="bg-slate-600 px-6 justify-center rounded-md mb-12">
                    <header className="modal-style-background px-5 py-4 rounded-md border-b  border-gray-100">
                        <h2 className="font-bold text-white text-2xl">Stadnina</h2>
                        <a className="text-white font-bold mt-3">Nie posiadasz stadniny? <span>Załóż ją już dzisiaj!</span></a>
                    </header>
                    <button type="button" className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lime-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {setOpenModal(true)}}>
                        Załóż swoją stadninę
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className=" p-6 justify-center rounded-md mb-10">
                <div className=" stud-image-bcgk ">
                    <h1 className="p-6 pt-16 text-gray-700 bg-white text-center text-4xl font-bold my-2">{stud.gamerStudName}</h1>
                </div>
                <div>
                    <DashboardCardHorseList stud = {stud}/>
                </div>
            </div>
        );
    }
}
export default GamerStudCard;
