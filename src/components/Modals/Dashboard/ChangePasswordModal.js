import React, {Fragment, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {put_request} from "../../../service/api_requests";
import {useHistory} from "react-router-dom";


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export default function ChangePasswordModal({user,openModal,setOpenModal,cancelButtonRef}) {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState({})
    let history = useHistory();
    const forceUpdate = useForceUpdate();
    const handleChange = (target) =>{
        input[target.name] = target.value;
        setInput(input);
        validate(target.name)
        forceUpdate();
    }
    const handleSubmit = event => {
        console.log(event)
        event.preventDefault();
        forceUpdate();
        if(
            cancelButtonRef &&
            validate("oldPassword") &&
            validate("newPassword") &&
            validate("newPasswordRepeat")
        ) {
            let body = {
                email: user.email,
                oldPassword: input["oldPassword"],
                newPassword: input["newPassword"]
            }
            put_request(
                'http://127.0.0.1:8080/gamer/changepassword',
                body,
                true

            ).then(r =>{
                console.log("status",r.status)
                if(r.status === 200){
                    history.push("/login")
                } else if(r.status === 500) {
                    let errorsNew = errors;
                    errorsNew["oldPassword"] = "Hasło nieprawidłowe";
                    setErrors(errorsNew);
                    forceUpdate();
                }
            });
        }
    }
    const validate = (name) =>{
        let inputNew = input;
        let errorsNew = errors;
        console.log(inputNew)
        let isValid = true;
        const validPasswords = () => {
            if (input["newPasswordRepeat"] && typeof input["newPassword"] !== "undefined" && typeof input["newPasswordRepeat"] !== "undefined") {

                if (input["newPassword"] !== input["newPasswordRepeat"]) {
                    isValid = false;
                    errors["newPasswordRepeat"] = "Podane hasła nie są takie same";
                } else {
                    errors["newPasswordRepeat"] = null;
                }
            }
        }
        switch (name){
            case "oldPassword":
                if (!inputNew["oldPassword"]) {
                    isValid = false;
                    errorsNew["oldPassword"] = "Podaj stare hasło";
                } else {
                    errorsNew["oldPassword"] = null;
                }
                break;
            case "newPassword":
                if (!inputNew["newPassword"]) {
                    isValid = false;
                    errorsNew["newPassword"] = "Podaj nowe hasło";
                } else {
                    errorsNew["newPassword"] = null;
                }
                validPasswords();
                break;
            case "newPasswordRepeat":

                if (!inputNew["newPasswordRepeat"]) {
                    isValid = false;
                    errorsNew["newPasswordRepeat"] = "Podaj nowe hasło";
                } else {
                    errorsNew["newPasswordRepeat"] = null;
                }
                break;
        }
        setErrors(errorsNew);
        return isValid;
    }
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
                        <div className="inline-block align-bottom  modal-style-background rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className=" text-center text-2xl leading-6 font-medium text-white">
                                                Zmiana hasła
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-white text-center font-bold">
                                                    Zmiana hasła spowoduje wylogowanie!
                                                </p>
                                                    <div className="pt-4">
                                                        <input
                                                            onChange={e =>{
                                                                handleChange( e.target);
                                                                forceUpdate()
                                                            }}
                                                            value={input.oldPassword}
                                                            type="password"
                                                            name="oldPassword"
                                                            id="oldPassword"
                                                            placeholder="Stare Hasło"
                                                            className={`block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white ${errors.oldPassword ? "ring-2 ring-red-700" : "" }`}
                                                        />
                                                        <p className="mt-2 flex text-white text-sm font-bold">
                                                            {errors.oldPassword}
                                                        </p>

                                                    </div>
                                                    <div className="pt-4">
                                                        <input
                                                            onChange={e =>{handleChange( e.target)}}
                                                            value={input.newPassword}
                                                            className={`block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white ${errors.newPassword ? 'ring-2 ring-red-700' :''}`}
                                                            type="password"
                                                            name="newPassword"
                                                            id="newPassword"
                                                            placeholder="Nowe Hasło"
                                                        />
                                                        <p className="mt-2 flex text-white text-sm font-bold">
                                                            {errors.newPassword}
                                                        </p>
                                                    </div>
                                                <div className="pt-4">
                                                    <input
                                                        onChange={e =>{handleChange( e.target)}}
                                                        value={input.newPasswordRepeat}
                                                        className={`block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white ${errors.newPasswordRepeat ? 'ring-2 ring-red-700' :''}`}
                                                        type="password"
                                                        name="newPasswordRepeat"
                                                        id="newPasswordRepeat"
                                                        placeholder="Powtórz nowe Hasło"
                                                    />
                                                    <p className="mt-2 flex text-white text-sm font-bold">
                                                        {errors.newPasswordRepeat}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-white text-base font-medium text-white  focus:outline-none focus:ring-1 bg-lime-600 hover:bg-lime-800 focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Zapisz
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-white text-base font-medium text-white bg-red-600 hover:bg-red-900 focus:outline-none focus:ring-1  focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpenModal(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
