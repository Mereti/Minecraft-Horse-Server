import React, {useEffect, useRef, useState} from 'react';
import {get_request, post_request} from "../../service/api_requests";
import ItemUseHorseModal from "../../components/Modals/Dashboard/ItemUseHorseModal";


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1 ); // update the state to force render
}

function DashboardCardStore({user}) {
    const [equipment,setEquipment] = useState([{}])
    const[store,setStore] = useState([{}])
    const [openModal, setOpenModal] = useState(false)
    const [chooseItem, setChooseItem] = useState([{}])
    const cancelButtonRef = useRef(null)
    const forceUpdate = useForceUpdate();
    const buttonRef = useRef();


    function getRequest(){

        get_request(
            'http://127.0.0.1:8080/equipment/equipment',
            true
        ).then(response => {
            if(response.body.length > 0){
                let equipmentGamer =  response.body.filter(x => x.gamerId.email === user.email);
                setEquipment(equipmentGamer);
                console.log(equipment)
                forceUpdate();
            }
        })
        get_request(
                'http://127.0.0.1:8080/store/items',
                true
            ).then(response => {
                if(response.body.length > 0){
                    let storeArray =  response.body;
                    setStore(storeArray);
                    forceUpdate();
                }
            })
    }
    useEffect(() => {
        getRequest();
        forceUpdate();
    }, [user]);
    const buyAction = (storeItem) => {
        if (user.points >= storeItem.price) {
            console.log("storeItem", storeItem)
            console.log("sprawdzamy usera: ",user);
            post_request(
                'http://127.0.0.1:8080/equipment/new/item',
                {
                    idItem: storeItem,
                    gamerId: user,
                },
                true
            ).then(response => {
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
        if (user.points >= storeItem.price) {
            let pointsData = {
                gamer: user,
                points: user.points - storeItem.price
            }
            post_request(
                'http://127.0.0.1:8080/gamer/changepoints',
                {
                    points:pointsData.points,
                    gamer: pointsData.gamer
                },
                true
            ).then(response => {
                if (response.status === 200) {
                    console.log("worked?")
                    console.log("punkty= " +user.points - storeItem.price)
                    forceUpdate();
                } else if (response.status === 401) {
                    console.log("maybenot?")
                    console.log("punkty= " +user.points - storeItem.price)
                } else {
                    alert("Coś poszło nie tak - status code: " + response.status)
                    console.log("punkty= " +user.points - storeItem.price)
                }
            }).catch(error => {
                alert("Wprowadzono nieprawidłowe dane")
            })
            }

    }

    return (
        <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <ItemUseHorseModal user={user} chooseItem = {chooseItem} openModal={openModal} setOpenModal={setOpenModal} cancelButtonRef={cancelButtonRef}/>
            <div>
                <div className="bg-white">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-800 text-4xl">Sklep</h2>
                    </header>
                    <div className="mt-4 mb-4 grid grid-cols-2 gap-4 items-center">
                        {store.map((storeItem) => {
                            return store.find(store => store.idItem !== storeItem.idItem) !== undefined ?
                                <div key ={storeItem.idItem} className="card-horse-margin  rounded overflow-hidden shadow-lg">
                                    {/*   <img className="w-full hidden-elements-image" src={item.idItem.imgSrc} width="128" height="128"/>*/}
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-2xl mb-4 text-gray-700">
                                            {storeItem.nameItem}
                                        </div>
                                        <div className="text-center text-lg mt-4 mb-4">
                                            {storeItem.description}
                                        </div>
                                        <div className="text-lg text-center mt-4 mb-4">
                                            Wartość: {storeItem.value}
                                        </div>
                                        <div className="text-lg text-center mt-4 mb-4">
                                            Cena: {storeItem.price} punktów
                                        </div>
                                            <button type="button"  onClick={()=>{buyAction(storeItem)}} className=" items-center mt-4 px-4 py-3 border border-transparent text-base font-medium rounded-md bg-white button-store-style md:py-4 md:text-lg md:px-10">
                                                { user.points < storeItem.price ? "Potrzebujesz "+(storeItem.price-user.points)+" punktów" : "masz: " + (user.points)+ "Kup" }
                                            </button>

                                    </div>
                                </div>: ""  })}
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-white">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-800 text-4xl">Twój ekwipunek</h2>
                    </header>
                    <div className="mt-4 mb-4 grid grid-cols-2 gap-4 items-center">
                        {equipment.map((item) => {
                                return equipment.find(equipment => equipment.equipmentId !== item.equipmentId) !== undefined ?
                                    <div  className="card-horse-margin  rounded overflow-hidden shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-2xl mb-4 text-gray-700">
                                               {item.idItem.nameItem}
                                            </div>
                                            <div className="text-center text-lg mt-4 mb-4">
                                               {item.idItem.description}
                                            </div>
                                            <div className="text-lg text-center mt-4 mb-4">
                                                Wartość: {item.idItem.value}
                                            </div>
                                            <button onClick={()=>{ setChooseItem(item); setOpenModal(true);}}>
                                                Wybierz konia
                                            </button>
                                        </div>
                                    </div>: "" })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCardStore;



