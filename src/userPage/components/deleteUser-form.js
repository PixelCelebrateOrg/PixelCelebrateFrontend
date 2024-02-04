import React from 'react';
import validate from "../../userPage/components/validators/userPage-validators";
import Button from "react-bootstrap/Button";
import * as API_USER from "../../userPage/api/userPage-api";
//import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { withRouter } from "react-router-dom";
import {AppContext} from "../../AppContext";

const buttonStyle1 = {backgroundColor: '#751212'};

class UserFormDelete extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            inputDate: "",

            formIsValid: false,
            formControls: {
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
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    deleteUser(user) {
        return API_USER.deleteUser(user, (result, status, error) => {
            //console.log(result);
            if (result === "User Deleted" && (status === 200 || status === 201)) {
                this.reloadHandler();
            }
            else {
                window.alert(result);
            }
        });
    }


    handleDelete() {
        this.deleteUser(this.state.formControls.email.value);
    }

    //si aici render, cu componente noi
    render() {

        const { isLoggedIn, setIsLoggedIn, setIsAdmin } = this.context;
        const logString = isLoggedIn.toString();

        return (
            <div style={{backgroundColor: '#496185'}}>

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

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button style={buttonStyle1}
                                    type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleDelete}>  Submit </Button>
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


export default withRouter(UserFormDelete);
