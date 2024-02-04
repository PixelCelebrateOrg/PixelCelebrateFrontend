import React from 'react';
import validate from "../../userPage/components/validators/userPage-validators";
import Button from "react-bootstrap/Button";
import * as API_USER from "../../userPage/api/userPage-api";
//import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { withRouter } from "react-router-dom";
import {AppContext} from "../../AppContext";

import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
const buttonStyle1 = {backgroundColor: '#751212'};

class UserFormAdd extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            inputDate: new Date(),

            formIsValid: false,
            formControls: {
                firstname: {
                    value: '',
                    placeholder: 'Firstname',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    }
                },
                lastname: {
                    value: '',
                    placeholder: 'Lastname',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    }
                },
                username: {
                    value: '',
                    placeholder: 'Username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    }
                },
                email: {
                    value: '',
                    placeholder: 'Email',
                    valid: false,
                    touched: false,
                    validationRules: {
                        emailValidator: true,
                        isRequired: true,
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password',
                    valid: false,
                    touched: false,
                    validationRules: {
                        passwordValidator: true
                    }
                },
                role: {
                    value: '',
                    placeholder: 'Role',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        roleValidator: true,
                    }
                },
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeDate(date){
        this.setState({
            inputDate: date
        });
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    addUser(user) {
        return API_USER.addUser(user, (result, status, error) => {
            //console.log(result);
            if (result !== null && (status === 200 || status === 201)) {
                console.log("User: " + result.email + " " + result.name + " " + result.role);
                this.reloadHandler();
            }
            else {
                window.alert("Email or Username already in use");
            }
        });
    }


    //cand dai submit dai register la persoana
    handleAdd() {
        let user = {
            firstname: this.state.formControls.firstname.value,
            lastname: this.state.formControls.lastname.value,
            username: this.state.formControls.username.value,
            dateofbirth:this.state.inputDate.getFullYear() + "-" + this.state.inputDate.getMonth() + "-" + this.state.inputDate.getDay()
            + "T00:00:00",
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            role: this.state.formControls.role.value,
        };

        
        if((this.state.inputDate.getMonth() + 1)<10)
        {
            if(this.state.inputDate.getDate()<10)
            {
                user.dateofbirth = this.state.inputDate.getFullYear() + '-0' + (this.state.inputDate.getMonth() + 1) + '-0' + this.state.inputDate.getDate() + "T00:00:00";
            }
            else
            {
                user.dateofbirth = this.state.inputDate.getFullYear() + '-0' + (this.state.inputDate.getMonth() + 1) + '-' + this.state.inputDate.getDate() + "T00:00:00";
            }
        }
        else
        {
            if(this.state.inputDate.getDate()<10)
            {
                user.dateofbirth = this.state.inputDate.getFullYear() + '-' + (this.state.inputDate.getMonth() + 1) + '-0' + this.state.inputDate.getDate() + "T00:00:00";
            }
        }

        console.log(user);
        this.addUser(user);
    }

    //si aici render, cu componente noi
    render() {

        const { isLoggedIn, setIsLoggedIn, setIsAdmin } = this.context;
        const logString = isLoggedIn.toString();

        return (
            <div style={{backgroundColor: '#496185'}}>
                    <FormGroup id='firstname'>
                    <Label for='firstnameField'> Firstname:</Label>
                    <Input name='firstname' id='nameField' placeholder={this.state.formControls.firstname.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.firstname.value}
                           touched={this.state.formControls.firstname.touched? 1 : 0}
                           valid={this.state.formControls.firstname.valid}
                           required
                    />
                    {this.state.formControls.firstname.touched && !this.state.formControls.firstname.valid &&
                        <div className={"error-message"}> * Firstname must have a valid format</div>}
                </FormGroup>
                <FormGroup id='lastname'>
                    <Label for='lastnameField'> Lastname:</Label>
                    <Input name='lastname' id='lastnameField' placeholder={this.state.formControls.lastname.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.lastname.value}
                           touched={this.state.formControls.lastname.touched? 1 : 0}
                           valid={this.state.formControls.lastname.valid}
                           required
                    />
                    {this.state.formControls.lastname.touched && !this.state.formControls.lastname.valid &&
                        <div className={"error-message"}> * Lastname must have a valid format</div>}
                </FormGroup>
                <FormGroup id='username'>
                    <Label for='usernameField'> Username:</Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                        <div className={"error-message"}> * Username must have a valid format</div>}
                </FormGroup>

                <FormGroup id='email'>
                    <Label for='emailField'> Email: </Label>
                    <Input name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input type="password" name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message"}> * Password must start with capital letter, 8-10 caracters, ends with digit followed by a special character</div>}
                </FormGroup>

                <FormGroup id='role'>
                    <Label for='roleField'> Role: </Label>
                    <Input name='role' id='roleField' placeholder={this.state.formControls.role.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.role.value}
                           touched={this.state.formControls.role.touched? 1 : 0}
                           valid={this.state.formControls.role.valid}
                           required
                    />
                    {this.state.formControls.role.touched && !this.state.formControls.role.valid &&
                    <div className={"error-message"}> * Role must be angajat or admin</div>}
                </FormGroup>

                <Label> Date: </Label>
                <DatePicker className = {"datePicker"} value={this.state.inputDate} onChange={ this.onChangeDate } format={"yyyy-MM-dd"}/>

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button style={buttonStyle1}
                                    type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleAdd}>  Submit </Button>
                        </Col>
                    </Row>

                {/*{*/}
                {/*    this.state.errorStatus > 0 &&*/}
                {/*    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>*/}
                {/*}*/}
                {/*<CookieUser ref={this.cookieRef} />*/}
            </div>
        ) ;
    }
}


export default withRouter(UserFormAdd);
