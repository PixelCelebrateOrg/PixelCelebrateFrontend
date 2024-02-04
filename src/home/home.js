import React, {useContext, useEffect, useState} from 'react'
import NavigationBar from "../navigation-bar";
import './home.css';
import {Button, Col, Container, Row, Modal, ModalBody, ModalHeader, Input} from "reactstrap";
import logoAdresa from '../commons/images/adresa-icon.svg';
import logoEmail from '../commons/images/email-icon.svg';
import logoTelefon from '../commons/images/phone-icon.svg';

import {AppContext} from "../AppContext";

import * as API_HOME from "./api/home-api";

export default function Home() {

    const [selected, setSelected] = useState(false);

    const { isAdmin, isLoggedIn, emailLoggedUser, setIsAdmin, setIsLoggedIn, setEmailLoggedUser } = useContext(AppContext);

    const [LoginOrNot, setLoginOrNot]= useState();

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        setIsAdmin(localStorage.getItem("isAdmin"));
        setEmailLoggedUser(localStorage.getItem("emailLoggedUser"));

    },[isLoggedIn, emailLoggedUser])

    const toggleForm = () => {
        setSelected(!selected);
    }

    const reload = () => {
        toggleForm();
    }

    const fetchUserData = () => {
        return API_HOME.getUserData((result, status, err) => {

            if (result !== null && status === 200) {
                // this.setState({
                //     tableData: result,
                //     isLoaded: true
                // });
            } else {
                // this.setState(({
                //     errorStatus: status,
                //     error: err
                // }));
            }
        });
    }


    return (
        <div>
            <NavigationBar />
            <div className="imaginePrincipala">
                <h1 className="textImagine">Pixel Celebrate</h1>
                {LoginOrNot}
            </div>
            <div className="divInformatii">
                <p className="textInformatii">Descrierea site-ului</p>
                <div className="lineInformatii"></div>
                <p className="textInfoStanga"> &ensp; Bine ai venit pe PixelData - portalul tau central pentru explorarea și înțelegerea tehnologiilor software aplicate în domeniul imaginilor medicale.</p>
                <p className="textInfoDreapta"> &ensp; Aici, punem la dispozitie o platforma cuprinzatoare pentru profesionistii din domeniul sanatatii, dezvoltatori de software și oricine este pasionat de intersectia dintre tehnologie si medicina</p>
            </div>
            <div className="divContact">
                <Container>
                    <Row>
                        <Col><p className="textContact">Informatii de contact</p></Col>
                    </Row>
                    <Row>
                        <Col xs="4"> <img src={logoAdresa} className="logoContact"  alt="logo adresa"/>
                            <p className="textLogo">Adresa</p></Col>
                        <Col xs="4"><img src={logoEmail} className="logoContact"  alt="logo adresa"/>
                            <p className="textLogo">Email</p></Col>
                        <Col xs="4"><img src={logoTelefon} className="logoContact"  alt="logo adresa"/>
                            <p className="textLogo">Telefon</p></Col>
                    </Row>
                    <Row>
                        <Col xs="4"><p className="textSubLogo">Strada Avram Iancu nr. 25, Cluj-Napoca, Romania</p></Col>
                        <Col xs="4"><p className="textSubLogo">pixel.celebrate@gmail.com</p></Col>
                        <Col xs="4"><p className="textSubLogo">+40 726 123 456</p></Col>
                    </Row>
                </Container>

                {/* <Modal isOpen={selected} toggle={toggleForm}
                       // className={this.props.className}
                       size="lg">
                    <ModalHeader style={{backgroundColor: '#496185'}} toggle={toggleForm}> Register: </ModalHeader>
                    <ModalBody style={{backgroundColor: '#496185'}}>
                        <RegisterForm reloadHandler={reload}/>
                    </ModalBody>
                </Modal> */}

            </div>
        </div>
    );
}