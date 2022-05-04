import React, {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import {get_request, post_request, put_request} from "../../../service/api_requests";
import {useHistory} from "react-router-dom";
import Button from "@material-tailwind/react/Button";
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export default function ItemUseHorseModal({user,chooseItem,openModal,setOpenModal,cancelButtonRef}) {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState({})
    const [stud,setStud] = useState({})
    const [horses,setHorses] = useState([{}])

    const itemSwitch = (chooseItem, item) =>{
        switch (chooseItem.idItem.idItem){
            case 1:
                return post_request(
                    'http://127.0.0.1:8080/horse/changehorse',
                    {
                        horse:item.thirst + chooseItem.idItem.value
                    },
                    true
                ).then(response => {
                    if (response.status  === 200) {
                        console.log("worked?")
                    } else if (response.status  === 401){
                        console.log("maybenot?")
                    } else {
                        alert("Coś poszło nie tak - status code: "+ response.status)
                    }
                }).catch(error=>{
                    alert("Wprowadzono nieprawidłowe dane" )
                });
            case 2:
                return post_request(
                    'http://127.0.0.1:8080/horse/changehorse',
                    {
                        horse:item.hungry + chooseItem.idItem.value
                    },
                    true
                ).then(response => {
                    if (response.status  === 200) {
                        console.log("worked?")
                    } else if (response.status  === 401){
                        console.log("maybenot?")
                    } else {
                        alert("Coś poszło nie tak - status code: "+ response.status)
                    }
                }).catch(error=>{
                    alert("Wprowadzono nieprawidłowe dane" )
                });
            case 3:
                return post_request(
                    'http://127.0.0.1:8080/horse/changehorse',
                    {
                        horse:item.fast + chooseItem.idItem.value
                    },
                    true
                ).then(response => {
                    if (response.status  === 200) {
                        console.log("worked?")
                    } else if (response.status  === 401){
                        console.log("maybenot?")
                    } else {
                        alert("Coś poszło nie tak - status code: "+ response.status)
                    }
                }).catch(error=>{
                    alert("Wprowadzono nieprawidłowe dane" )
                });
            case 4:
                return post_request(
                    'http://127.0.0.1:8080/horse/changehorse',
                    {
                        horse:item.appearance + chooseItem.idItem.value
                    },
                    true
                ).then(response => {
                    if (response.status  === 200) {
                        console.log("worked?")
                    } else if (response.status  === 401){
                        console.log("maybenot?")
                    } else {
                        alert("Coś poszło nie tak - status code: "+ response.status)
                    }
                }).catch(error=>{
                    alert("Wprowadzono nieprawidłowe dane" )
                });
        }
    }

    const loadHorses = () => {
        if(user !== undefined && user !== null){
            get_request(
                'http://127.0.0.1:8080/stud/studs',
                true
            ).then(response => {
                if(response.body.length > 0){
                    let studs = response.body;
                    let userStud = studs.find(s => s.gamerId.gamerId === user.id);
                    if(userStud !== undefined){
                        setStud(userStud)
                        if(stud !== undefined && stud.id !== null){
                            get_request(
                                'http://127.0.0.1:8080/horse/horses',
                                true
                            ).then(response => {
                                if(response.body.length > 0){
                                    let horseArray = response.body.filter(x => x.gamerStud.gamerStudId === stud.gamerStudId);
                                    setHorses(horseArray);
                                }
                            })
                        }
                    }
                }
            })
        }
        forceUpdate();
    }
    let history = useHistory();
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        loadHorses()
    }, [chooseItem,openModal,setOpenModal,user]);
    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={(e)=>{
                setOpenModal(e);
                setInput({});
                setErrors({});
            }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                            <div className="bg-white pt-5 pb-4 sm:p-4 sm:pb-4">
                                <div className="p-3">
                                    <Dialog.Title as="h3" className="mb-4 text-center text-lg leading-6 font-medium text-gray-900">
                                        Wybierz konia
                                    </Dialog.Title>
                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            {/* Table header */}
                                            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                                            <tr>
                                                <th className="p-2">
                                                    <div className="font-semibold text-left">Nazwa Konia</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Rasa</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Wartość</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Głód</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Pragnienie</div>
                                                </th>
                                                <th className="p-2">
                                                </th>
                                            </tr>
                                            </thead>
                                            {/* Table body */}
                                            <tbody className="text-sm font-medium divide-y divide-gray-100">
                                            {horses.map((item) => (
                                                    <tr>
                                                        <td className="p-2">
                                                            <div className="flex items-center">
                                                                <div className="text-gray-800">{item.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-center">{item.breed === undefined ? "" : item.breed.horseBreed}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-center green-col-tab">{item.value}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-center text-amber-500">{item.hungry}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-center green-col-tab">{item.thirst}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-center ">
                                                                <Button size="small"
                                                                        color="green"
                                                                        className="button-join"
                                                                        onClick={()=>{
                                                                            itemSwitch(chooseItem,item)
                                                                            setOpenModal(false);
                                                                        }}
                                                                > Wybierz</Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
