import React, { useContext,  useEffect, useState } from 'react'
import NavigationBar from "../navigation-bar";
import './userPage.css';
import {Button, Col, Container, Row, Modal, ModalBody, ModalHeader} from "reactstrap";
import logoAdresa from "../commons/images/adresa-icon.svg";
import logoEmail from "../commons/images/email-icon.svg";
import logoTelefon from "../commons/images/phone-icon.svg";
import UserFormAdd from "./components/addUser-form";
import UserFormUpdate from "./components/updateUser-form";
import UserFormDelete from "./components/deleteUser-form";
import UserTableAdmin from "./components/userTableAdmin";
import UserTableAngajat from "./components/userTableAngajat";
import * as API_USER from "../userPage/api/userPage-api";
import { FormGroup, Input, Label} from 'reactstrap';
import SetDayForm from './components/setDay-form';

import {AppContext} from "../AppContext";
import { getUserData } from '../home/api/home-api';

export default function DesprenoiContainer() {

    const { isAdmin, isLoggedIn, emailLoggedUser, setIsAdmin, setIsLoggedIn, setEmailLoggedUser} = useContext(AppContext);
    const [selectedAdd, setSelectedAdd] = useState(false);
    const [selectedUpdate, setSelectedUpdate] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(false);
    const [selectedSetDay, setSelectedSetDay] = useState(false);
    const [AdminOrNot, setAdminOrNot]= useState();
    const [DateAngajat, setDateAngajat]= useState();
    const [tableDataAdmin, setTableDataAdmin] = useState([]);

    const fetchUsers = () => {
        return API_USER.getUsers((result, status, err) => {

            if (result !== null && status === 200) {
                setTableDataAdmin(result);
                setAdminOrNot(<div style={{marginLeft: "10%", paddingTop: "2%", paddingBottom:"2%", width:"80%", height:"fit-content"}}>
                <h2 style={{marginBottom: "3%"}}>Admin Operations</h2>
                <Button style={{marginRight: "1%"}} className="buttonSearch" onClick={toggleFormAdd}>Add</Button>
                <Button style={{marginRight: "1%"}} className="buttonSearch" onClick={toggleFormUpdate}>Update</Button>
                <Button className="buttonSearch" onClick={toggleFormDelete}>Delete</Button>
                <Row style={{marginTop: "5%"}}>
                    <Col sm={{size: '4', offset: 3}}>
                        <h4>Number of days before birthday</h4>
                    </Col>
                    <Col sm={{size: '2', offset: 0}}>
                    <   Button className="buttonSearch" onClick={toggleFormSetDay}>Set Day</Button>
                    </Col>
                </Row>
                <Row style={{marginTop: "2%"}}>
                            <Col sm={{size: '8', offset: 2}}>
                                <UserTableAdmin tableData = {result}/>
                            </Col>
                </Row>
            </div>)
            } else {
            }
        });
    }

    const fetchUsersAngajat = () => {
        return API_USER.getUsersAngajat((result, status, err) => {

            if (result !== null && status === 200) {
                setAdminOrNot(<div style={{marginLeft: "10%", paddingTop: "2%", paddingBottom:"2%", width:"80%", height:"fit-content"}}>
                <h2 style={{marginBottom: "3%"}}>Tabel Utilizatori</h2>
                <Row style={{marginTop: "2%"}}>
                            <Col sm={{size: '8', offset: 2}}>
                                <UserTableAngajat tableData = {result}/>
                            </Col>
                </Row>
            </div>)
            } else {
            }
        });
    }

    const fetchDateAngajat = () => {
        return API_USER.getDateAngajat(localStorage.getItem("emailLoggedUser"), (result, status, err) => {

            if (result !== null && status === 200) {
                setDateAngajat(<div style={{padding: "2%", paddingBottom:"2%", width:"100%", height:"fit-content",
                borderWidth: "1vmax 0 0 0", borderStyle:"solid", borderColor: "#262121"
            }}>
                <h2 style={{marginBottom: "3%"}}>Date Angajat Logat</h2>
                {/* <Row style={{marginTop: "2%"}}>
                            <Col sm={{size: '8', offset: 2}}>
                                <UserTableAngajat tableData = {result}/>
                            </Col>
                </Row> */}
                <div className="grid-container">
                    <div className="grid-child">
                    <FormGroup id='firstname'>
                    <Label for='firstnameField'> <strong>Firstname:</strong></Label>
                    <Input name='firstname' id='nameField'
                           defaultValue={result.FirstName}
                           readOnly
                    />
                </FormGroup>
                <FormGroup id='lastname'>
                    <Label for='lastnameField'> <strong>Lastname:</strong></Label>
                    <Input name='lastname' id='lastnameField'
                           defaultValue={result.LastName}
                           readOnly
                    />
                </FormGroup>
                <FormGroup id='username'>
                    <Label for='usernameField'> <strong>Username:</strong></Label>
                    <Input name='username' id='usernameField'
                           defaultValue={result.Username}
                           readOnly
                    />
                </FormGroup>

                    </div>

                    <div className="grid-child">

                    <FormGroup id='email'>
                    <Label for='emailField'> <strong>Email:</strong></Label>
                    <Input name='email' id='emailField'
                           defaultValue={result.Email}
                           readOnly
                    />
                </FormGroup>

                <FormGroup id='role'>
                    <Label for='roleField'> <strong>Role:</strong> </Label>
                    <Input name='role' id='roleField'
                           defaultValue={result.Role}
                           readOnly
                    />
                </FormGroup>

                <FormGroup id='dateOfBirth'>
                    <Label for='dateOfBirth'> <strong>dateOfBirth:</strong> </Label>
                    <Input name='dateOfBirth' id='dateOfBirthField'
                           defaultValue={result.DateOfBirth.substring(0, result.DateOfBirth.indexOf("T"))}
                           readOnly
                    />
                </FormGroup>
                </div>
                </div>
            </div>)
            } else {
            }
        });
    }


    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        setIsAdmin(localStorage.getItem("isAdmin"));
        setEmailLoggedUser(localStorage.getItem("emailLoggedUser"));

        if (isLoggedIn ==="true" && isAdmin === "true")
        {
            fetchUsers();
        }
        else if (isLoggedIn ==="true" && isAdmin === "false"){
            fetchUsersAngajat();
            fetchDateAngajat();
        }
        else{
        setAdminOrNot(<div>
        </div>)
    }

    },[isLoggedIn, emailLoggedUser, selectedAdd, selectedUpdate, selectedDelete])

    const toggleFormAdd = () => {
        setSelectedAdd(!selectedAdd);
    }

    const toggleFormUpdate = () => {
        setSelectedUpdate(!selectedUpdate);
    }

    const toggleFormDelete = () => {
        setSelectedDelete(!selectedDelete);
    }

    const toggleFormSetDay = () => {
        setSelectedSetDay(!selectedSetDay);
    }
    
    const reload = (whichOne) => {
        if(whichOne === 1)
        {
            toggleFormAdd();
            window.location.reload(false);
        }
        else if(whichOne === 2)
        {
            toggleFormUpdate();
            window.location.reload(false);
        }
        else if(whichOne === 3)
        {
            toggleFormDelete();
            window.location.reload(false);
        }
        else if(whichOne === 4)
        {
            toggleFormSetDay();
        }
    }

    return (
        <div>
            <NavigationBar />
            <div className="imaginePrincipalaDespreNoi">
                <h1 className="textImagineDespreNoi">User Page</h1>
            </div>
            <div className='divPrezentareDespreNoi'>
            {AdminOrNot}
            {DateAngajat}
            </div>
            <div className="divContactDespreNoi">
                <Container>
                    <Row>
                        <Col><p className="textContactDespreNoi">Informatii de contact</p></Col>
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
            </div>

            <Modal isOpen={selectedAdd} toggle={toggleFormAdd}
                // className={this.props.className}
                   size="lg">
                <ModalHeader style={{backgroundColor: '#496185'}} toggle={toggleFormAdd}> Add: </ModalHeader>
                <ModalBody style={{backgroundColor: '#496185'}}>
                    <UserFormAdd reloadHandler={() => reload(1)}/>
                </ModalBody>
            </Modal>


            <Modal isOpen={selectedUpdate} toggle={toggleFormUpdate}
                // className={this.props.className}
                   size="lg">
                <ModalHeader style={{backgroundColor: '#496185'}} toggle={toggleFormUpdate}> Update the user with the matching email: </ModalHeader>
                <ModalBody style={{backgroundColor: '#496185'}}>
                    <UserFormUpdate reloadHandler={() => reload(2)}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={selectedDelete} toggle={toggleFormDelete}
                // className={this.props.className}
                   size="lg">
                <ModalHeader style={{backgroundColor: '#496185'}} toggle={toggleFormDelete}> Delete: </ModalHeader>
                <ModalBody style={{backgroundColor: '#496185'}}>
                    <UserFormDelete reloadHandler={() => reload(3)}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={selectedSetDay} toggle={toggleFormSetDay}
                // className={this.props.className}
                   size="lg">
                <ModalHeader style={{backgroundColor: '#496185'}} toggle={toggleFormSetDay}> Set number of days before birthday: </ModalHeader>
                <ModalBody style={{backgroundColor: '#496185'}}>
                    <SetDayForm reloadHandler={() => reload(4)}/>
                </ModalBody>
            </Modal>
        </div>
    );
}