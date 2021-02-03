import React, {useState} from 'react'
import {FormGroup, InputGroup, Button, Overlay} from "@blueprintjs/core";
import {Link} from "react-router-dom";
import PJ from '../../package.json';
import Api from '../ApiManager';

function SignUpBlocked() {
    return(
        <div className={'custom-container alignment-center'}>
            <div style={{width: '50%'}}>
                <h3>SIGN UP FUNCTIONAL BLOCKED DUE TO IVAO AUTHENTICATION TURNED ON</h3>
            </div>
        </div>
    )
}

function SignUpSuccess() {
    return(
        <div className={'custom-container alignment-center'}>
            <div style={{width: '50%'}}>
                <h2>You are successfull signedup, please go to <Link to={'/Login'}>LOGIN page to login</Link></h2>
            </div>
        </div>
    )
}

function SignUpForm() {
    const [vid, setVid] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [division, setDivision] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const handleChange = fn => e => {
        fn(e.target.value)
    }
    const doSignUp = async () => {
        let data = {
            vid: vid,
            firstname: firstname,
            lastname: lastname,
            division: division,
            country: country,
            password: password
        }
        let query = await Api('register_user', "POST", data);
        let result = await query.json();
        localStorage.signedup = result.success;
        if(!result.success){
            setErrorMessage(result.message);
        }
        else{
            window.location.reload();
        }
    }
    return (
        <div className={'custom-container alignment-center'}>
            <div style={{width: '50%'}}>
                <h2>SIGN UP TO OUR VIRTUAL AIRLINE</h2>
                <FormGroup
                    helperText="You can find your VID in mailbox after signup on IVAO network..."
                    label="IVAO VID:"
                    labelFor="signup-vid"
                    >
                    <InputGroup value={vid}
                                onChange={handleChange(setVid)}
                                id="signup-vid"
                                placeholder="Provide your IVAO VID"
                                intent={vid ? "":"danger"}
                    />
                </FormGroup>
                <FormGroup
                    label="Firstname:"
                    labelFor="signup-firstname"
                >
                    <InputGroup value={firstname}
                                onChange={handleChange(setFirstName)}
                                id="signup-firstname"
                                placeholder="Provide your first name"
                                intent={firstname ? "":"danger"}
                    />
                </FormGroup>
                <FormGroup
                    label="Lastname:"
                    labelFor="signup-lastname"
                >
                    <InputGroup value={lastname}
                                onChange={handleChange(setLastName)}
                                id="signup-lastname"
                                placeholder="Provide your last name"
                                intent={lastname ? "":"danger"}
                    />
                </FormGroup>
                <div style={{display: 'flex'}}>
                    <FormGroup
                        label="Division:"
                        labelFor="signup-division"
                        style={{marginRight: 5, width: '50%'}}
                    >
                        <InputGroup value={division}
                                    onChange={handleChange(setDivision)}
                                    id="signup-division"
                                    placeholder="Two letters division code"
                                    intent={division ? "":"danger"}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Country:"
                        labelFor="signup-country"
                        style={{marginLeft: 5, width: "50%"}}
                    >
                        <InputGroup value={country}
                                    onChange={handleChange(setCountry)}
                                    id="signup-country"
                                    placeholder="Two letters country code"
                                    intent={country ? "":"danger"}
                        />
                    </FormGroup>
                </div>
                <FormGroup
                    label="Password:"
                    labelFor="signup-password"
                >
                    <InputGroup value={password}
                                onChange={handleChange(setPassword)}
                                id="signup-password"
                                type={'password'}
                                placeholder="Choose a password"
                                intent={password ? "":"danger"}
                    />
                </FormGroup>
                <Button onClick={doSignUp} large intent={'success'} outlined text={'SIGN UP'} icon={'user'}/>
            </div>
            <Overlay className={"alignment-center"} isOpen={errormessage} onClose={()=>{window.location.reload()}}>
                    <div className={"alignment-center"} style={{width: "40%", height: '30vh', backgroundColor: 'white'}}>
                        <div>
                            <h4>AN ERROR OCCURED:</h4>
                            {errormessage}
                        </div>
                    </div>
            </Overlay>
        </div>
    )
}

function SignUp() {
    let clf = PJ["use-ivao-auth"] ? SignUpBlocked : (localStorage.signedup === "true" ? SignUpSuccess : SignUpForm);
    return clf();
}

export default SignUp