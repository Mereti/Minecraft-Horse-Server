import React, { Component } from "react";
import "./Login-style.css";
import {post_request} from '../../service/api_requests';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:{},
            input: {},
            token: ""
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
            this.validate("password")
        ){
            post_request(
                'http://127.0.0.1:8080/login',
                {
                    email:this.state.input["email"] ,
                    password:this.state.input["password"]
                },
                false
            ).then(response => {
                if (response.status  === 200) {
                    localStorage.removeItem('authToken')
                    localStorage.setItem('authToken', response.body.token);
                    this.props.history.push('/panel/');
                } else if (response.status  === 401){
                    let errors = this.state.errors;
                    errors["email"] = "Nie znaleziono konta";
                    this.setState({
                        errors: errors
                    });
                } else {
                    alert("Coś poszło nie tak - status code: "+ response.status)
                }
            }).catch(error=>{
                alert("Wprowadzono nieprawidłowe dane" )
            })
        }
    }
    validate(name){
        let input = this.state.input;
        let errors = this.state.errors;
        let isValid = true;
        switch (name){
            case "email":
                if (!input["email"]) {
                    isValid = false;
                    errors["email"] = "Podaj Email";
                }
                if (typeof input["email"] !== "undefined") {

                    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (!pattern.test(input["email"])) {
                        isValid = false;
                        errors["email"] = "Wprowadź poprawyny email";
                    } else {
                        errors["email"] = null;
                    }
                }
                break;
            case "password":
                if (!input["password"]) {
                    isValid = false;
                    errors["password"] = "Podaj hasło";
                } else {
                    errors["password"] = null;
                }
                break;
            default:
                break;
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    render() {
        return(
            <section className="page-background min-h-screen flex items-stretch text-white ">

                <div className="  w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
                    <div className=" absolute lg:hidden z-10 inset-0  bg-no-repeat  items-center"
                    >
                        <div className="absolute  inset-0 z-0"/>
                    </div>
                    <div className="w-full items-center py-6 z-10 ">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl my-6">
                            <span className="block xl:inline text-white">Logowanie</span>
                        </h1>
                        <form onSubmit={this.handleSubmit} className=" box-size mt-8 px-5 lg:px-0 mx-auto">
                            <div className=" justify-center  space-x-2 text-center text-white hover:underline">
                                <a href="/register">Nie masz konta? <span className="font-bold">Zarejestruj się już dziś</span></a>
                            </div>
                            <div className=" justify-center  space-x-4 text-center text-white ">
                                <a href="/" >Lub przejdź do <span className="font-bold">Strony Głównej</span></a>
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.input.email}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white "/>
                                <p className="mt-2 flex text-white text-sm font-bold ">
                                    {this.state.errors.email}
                                </p>
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.input.password}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Hasło"
                                    className="block w-full p-4 text-lg rounded-lg colored-text-input bg-white border-white "/>
                                <p className="mt-2 flex text-white text-sm font-bold">
                                    {this.state.errors.password}
                                </p>
                            </div>
                            <div className="pb-2 pt-4">
                                <button
                                    type="submit"
                                    value="Submit"
                                    className="items-center  border border-transparent text-base font-medium rounded-md bg-white button-style md:py-4 md: px-4 md:text-lg ">
                                    Zaloguj Się
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}
export default Login;
