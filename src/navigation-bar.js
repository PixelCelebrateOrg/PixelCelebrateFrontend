import React, {useContext, useEffect, useState} from 'react'
import logo from './commons/images/building-icon.svg';
import './navigation-bar.css';
import {
    Button, Input, Modal, ModalBody, ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
} from 'reactstrap';

import LoginForm from "./home/components/login-form";
import {AppContext} from "./AppContext";
import * as API_HOME from "./home/api/home-api";
//import RegisterForm from "./home/components/register-form";
import { BrowserRouter } from "react-router-dom";

//aici e o constanta, e un div
export default function NavigationBar() {

    const [selected, setSelected] = useState(false);
    const { isAdmin, isLoggedIn, emailLoggedUser, setIsAdmin, setIsLoggedIn, setEmailLoggedUser,
        } = useContext(AppContext);
    const [LoginOrNot, setLoginOrNot]= useState();
    const [SecondPageIfLoggedIn, setSecondPageIfLoggedIn]= useState();

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        setIsAdmin(localStorage.getItem("isAdmin"));
        setEmailLoggedUser(localStorage.getItem("emailLoggedUser"));
        if (isLoggedIn==="true" && window.location.href === "http://localhost:3000/") {
            setLoginOrNot(<div>
                         <Button
                            onClick={() => handleLogout(setIsLoggedIn, setIsAdmin, setEmailLoggedUser)}
                             style={{
                                 borderRadius: "15px 15px 15px 15px", position: "absolute", right: "30px", top: "10px",
                                 backgroundColor: "white", color: "black"
                            }}>Logout </Button>
                     </div>)
        }
        else if (window.location.href === "http://localhost:3000/"){
            setLoginOrNot(<div>
                         <Button
                             onClick={toggleForm}
                             style={{
                                 borderRadius: "15px 15px 15px 15px", position: "absolute", right: "30px", top: "10px",
                                 backgroundColor: "white", color: "black"
                             }}>Login </Button>
                     </div>)
        }
        if (isLoggedIn==="true") {
            setSecondPageIfLoggedIn(<Nav className="mr-auto" navbar>
            <NavLink className="navlink1" href="/userPage">UserPage</NavLink>
            </Nav>)
        }
        else {
            setSecondPageIfLoggedIn(<Nav className="mr-auto" navbar>
            <NavLink className="navlink1"></NavLink>
            </Nav>)
        }
    },[isLoggedIn], [LoginOrNot])

    const toggleForm = () => {
        setSelected(!selected);
    }

    const reload = () => {
        toggleForm();
    }

    const logoutUser = (setIsLoggedIn, setIsAdmin, setEmailLoggedUser) => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        setEmailLoggedUser("");
        localStorage.setItem("emailLoggedUser","");
        setIsAdmin(false);
        localStorage.setItem("isAdmin", false);
        setEmailLoggedUser("");
        localStorage.setItem("emailLoggedUser","");
    }

    const handleLogout = (setIsLoggedIn, setIsAdmin, setEmailLoggedUser) => {

        logoutUser(setIsLoggedIn, setIsAdmin, setEmailLoggedUser);
        //this.props.appContext.setIsAdmin(true);
        //console.log(this.props.appContext.isAdmin);
    }

    return (<div style={{display: "unset"}}>
        <Navbar color="dark" light expand="md" style={{position: "sticky", top: "0vmax", width: "100%", zIndex: "1"}}>
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"}/>
            </NavbarBrand>
            {/* <Nav className="mr-auto" navbar>
                <NavLink className="navlink1" href="/desprenoi">DespreNoi</NavLink>
                {LoginOrNot}

            </Nav> */}
            {SecondPageIfLoggedIn}
            {LoginOrNot}
        </Navbar>

        <Modal isOpen={selected} toggle={toggleForm}
            // className={this.props.className}
               size="lg">
            <ModalHeader style={{backgroundColor: '#496185'}} toggle={toggleForm}> Login: </ModalHeader>
            <ModalBody style={{backgroundColor: '#496185'}}>
                <LoginForm reloadHandler={reload}/>
            </ModalBody>
        </Modal>
    </div>)
};

//export default NavigationBar
