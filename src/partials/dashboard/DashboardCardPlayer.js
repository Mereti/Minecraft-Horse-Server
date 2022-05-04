import React, {useRef, useState} from 'react';
import ChangePasswordModal from "../../components/Modals/Dashboard/ChangePasswordModal";
import {post_request} from "../../service/api_requests";

function DashboardCardPlayer({user}) {
    const [openModal, setOpenModal] = useState(false)
    const cancelButtonRef = useRef(null)

    const deleteUser = (user) =>{
        post_request('http://127.0.0.1:8080/deleteuser)',
            {
                email: user.email
            },
            true
        ).then(response =>
        {
            if (response.status  === 200) {
                console.log("worked")
            } else if (response.status  === 401){
                console.log("maybenot?")
            } else {
                alert("Coś poszło nie tak - status code: "+ response.status)
            }
        }).catch(error=>{
            alert("Wprowadzono nieprawidłowe dane" )
        })
    }

    return (

        <div className="float-left flex flex-col col-span-full sm:col-span-12 xl:col-span-12">
            <ChangePasswordModal
                user = {user}
                openModal={openModal}
                setOpenModal={setOpenModal}
                cancelButtonRef={cancelButtonRef}/>
            <div className="  bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="px-5 pt-5">
                <div className="flex-grow justify-center text-left p-3">
                    <h1 className="text-slate-100 text-center text-4xl font-bold mb-4 my-2">{user != null? user.nickname :""}</h1>
                    <div className="mt-8 sm:grid grid-cols-4 sm:space-x-4">
                        <div className="bg-slate-600 p-6 justify-center rounded-md mb-4">
                            <div className="flex justify-center mb-4 ">
                                <img className="w-24 h-24 rounded-md" src={user != null? user.avatar :""} width="128" height="128" alt="User" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center content-center items-center text-center bg-slate-600 p-6 rounded-md mb-4">
                            <span className="text-s font-semibold text-gray-400 uppercase mb-4">Email</span>
                            <h2 className="text-slate-100 text-xl font-semibold">{user != null? user.email :""}</h2>
                        </div>
                        <div className="flex flex-col justify-center content-center items-center text-center bg-slate-600 p-6 rounded-md mb-4">
                            <span className="text-s font-semibold text-gray-400 uppercase mb-4">Punkty</span>
                            <h2 className="text-slate-100 text-2xl font-semibold">{user != null? user.points :""}</h2>
                        </div>
                        <div className="flex flex-col justify-center content-center items-center text-center bg-slate-600 p-6 rounded-md mb-4">
                            <span className="text-s font-semibold text-gray-400 uppercase mb-4">Czas w grze</span>
                            <h2 className="text-slate-100 text-2xl font-semibold">{user != null? user.spendTime :""}</h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
                <div className="px-5 pt-5">
                    <h1 className="text-slate-80 text-center text-2xl font-bold mb-4 my-2">Edytuj</h1>
                    <div className="mb-8 mt-8">
                        <a className="w-10  items-center  px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white button-style md:py-4 md:text-lg md:px-20" to="#0" onClick={()=>{setOpenModal(true)}}>
                            Zmiana hasła
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCardPlayer;
