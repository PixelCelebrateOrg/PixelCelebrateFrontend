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

class SetDayForm extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            formIsValid: false,
            formControls: {
                numberOfDays: {
                    value: '',
                    placeholder: 'Number of Days',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSetDay = this.handleSetDay.bind(this);
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

    SetDay(numberOfDays) {
        return API_USER.SetDay(numberOfDays, (result, status, error) => {
            //console.log(result);
            if (result === "Day was set" && (status === 200 || status === 201)) {
                this.reloadHandler();
            }
            else {
                window.alert(result);
            }
        });
    }


    handleSetDay() {
        this.SetDay(this.state.formControls.numberOfDays.value);
    }

    //si aici render, cu componente noi
    render() {

        const { isLoggedIn, setIsLoggedIn, setIsAdmin } = this.context;
        const logString = isLoggedIn.toString();

        return (
            <div style={{backgroundColor: '#496185'}}>

                <FormGroup id='numberOfDays'>
                    <Label for='numberOfDaysField'> Number of Days: </Label>
                    <Input type = "number" name='numberOfDays' id='numberOfDaysField' placeholder={this.state.formControls.numberOfDays.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.numberOfDays.value}
                           touched={this.state.formControls.numberOfDays.touched? 1 : 0}
                           valid={this.state.formControls.numberOfDays.valid}
                           required
                    />
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button style={buttonStyle1}
                                    type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSetDay}>  Submit </Button>
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


export default withRouter(SetDayForm);
