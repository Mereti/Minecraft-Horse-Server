import React, {Component} from 'react';
import './Register-style.scss';
import {get_request, post_request} from "../../service/api_requests";
import ErrorModal from "../Modals/ErrorModal";
// import { useForm, Controller } from "react-hook-form";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            errors:{
                email:'',
                name:'',
                password:'',
                passwordRepeat:'',
             },
            input: {
                email:'',
                name:'',
                password:'',
                passwordRepeat:'',
            },
            modal:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.validate(event.target.name);

        this.setState({
            input
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        if(
            this.validate("email") &&
            this.validate("name") &&
            this.validate("password") &&
            this.validate("passwordRepeat")
        ){
            post_request(
                'http://127.0.0.1:8080/register',
                {
                    email:this.state.input["email"] ,
                    nickname:this.state.input["name"]  ,
                    password:this.state.input["password"]
                },
                false
            ).then(response => {
                if (response.status  === 200) {
                    this.props.history.push('/login');
                } else if (response.status  === 500){
                    let errors = this.state.errors;
                    errors["email"] = "Ten mail jest już w użyciu";
                    this.setState({
                        errors: errors
                    });
                } else {
                    alert("Coś poszło nie tak")

                }
            }).catch(error=>{
                alert("Coś poszło nie tak: " + error)
                console.log(error)
            })
        }



        // if(this.validate()){
        //     console.log(this.state);
        //
        //     let input = {};
        //     input["name"] = "";
        //     input["email"] = "";
        //     input["password"] = "";
        //     input["passwordRepeat"] = "";
        //     this.setState({input:input});
        //
        //     alert('Demo Form is submited');
        // }
    }

    validate(name){
        let input = this.state.input;
        let errors = this.state.errors;
        let isValid = true;
        const validPasswords = () => {
            if (input["passwordRepeat"] && typeof input["password"] !== "undefined" && typeof input["passwordRepeat"] !== "undefined") {

                if (input["password"] !== input["passwordRepeat"]) {
                    isValid = false;
                    errors["passwordRepeat"] = "Podane hasła nie są takie same";
                } else {
                    errors["passwordRepeat"] = null;
                }
            }
        }

        switch (name){
            case "email":
                if (!input["email"]) {
                    isValid = false;
                    errors["email"] = "Podaj swój adres email";
                }
                if (typeof input["email"] !== "undefined") {

                    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (!pattern.test(input["email"])) {
                        isValid = false;
                        errors["email"] = "Podany email jest nieprawidłowy";
                    } else {
                        errors["email"] = null;
                    }
                }
                break;
            case "name":
                if (!input["name"]) {
                    isValid = false;
                    errors["name"] = "Wprowadz swoją nazwę użytkownika.";
                } else {
                    errors["name"] = null;
                }
                break;
            case "password":
                if (!input["password"]) {
                    isValid = false;
                    errors["password"] = "Podaj hasło";
                } else {
                    errors["password"] = null;
                }
                validPasswords();
                break;
            case "passwordRepeat":
                if (!input["passwordRepeat"] && input["password"]) {
                    isValid = false;
                    errors["passwordRepeat"] = "Powtórz swoje hasło";
                } else {
                    errors["passwordRepeat"] = null;
                }
                validPasswords();
                break;
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    render(){
        return(
            <section className= "min-h-screen flex items-stretch text-white ">
                <div className="  page-background w-full flex items-center justify-center text-center md:px-16 px-0 z-0">

                    <div className="w-full py-6 z-20">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl my-6">
                            <span className="block xl:inline text-white">Rejestracja</span>{' '}
                        </h1>
                        <form onSubmit={this.handleSubmit} className="box-size mt-8 px-5 lg:px-0 mx-auto">
                            <div className="pt-4">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.input.email}
                                    aria-label="email-input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Adres Email"
                                    className={`block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white ${this.state.errors.email ? "ring-2 ring-red-700" : "" }`}
                                />
                                <p aria-label="email-label"
                                   className="mt-2 flex text-white text-sm font-bold">
                                    {this.state.errors.email}
                                </p>
                            </div>
                            <div className="pt-4">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.input.name}
                                    aria-label="namel-input"
                                    type="Text"
                                    name="name"
                                    id="name"
                                    placeholder="Nick z gry"
                                    className={`block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white${this.state.errors.name ? "ring-2 ring-red-700" : "" }`}
                                />
                                <p aria-label="name-label"
                                   className="mt-2 flex text-white text-sm font-bold">
                                    {this.state.errors.name}
                                </p>

                            </div>
                            <div className="pt-4">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.input.password}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Podaj Hasło"
                                    className={`block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white ${this.state.errors.password ? "ring-2 ring-red-700" : "" }`}
                                />
                                <p className="mt-2 flex text-white text-sm font-bold">
                                    {this.state.errors.password}
                                </p>

                            </div>
                            <div className="pt-4">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.input.passwordRepeat}
                                    type="password"
                                    name="passwordRepeat"
                                    id="passwordRepeat"
                                    placeholder="Powtórz Hasło"
                                    className="block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white"/>
                                <p className="mt-2 flex text-white text-sm font-bold">
                                    {this.state.errors.passwordRepeat}
                                </p>
                            </div>
                            <div className=" justify-center  space-x-2 text-center text-white hover:underline">
                                <a href="/login">Masz już konto? <span className="font-bold">Zaloguj się! </span></a>
                            </div>
                            <div className=" pb-2 pt-4">
                                <button
                                    type="submit"
                                    value="Submit"
                                    className="items-center  border border-transparent text-base font-medium rounded-md bg-white button-style md:py-4 md: px-4 md:text-lg ">
                                    Zarejestruj Się
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
