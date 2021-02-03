import React, {useState} from 'react'
import {FormGroup, InputGroup, Button, Overlay} from "@blueprintjs/core";
import PJ from '../../package.json';
import Api from '../ApiManager';

function LoginBlocked() {
    return(
        <div className={'custom-container alignment-center'}>
            <div style={{width: '50%'}}>
                <h3>LOG IN FUNCTIONAL BLOCKED DUE TO IVAO AUTHENTICATION TURNED ON</h3>
            </div>
        </div>
    )
}

function LoginSuccess() {
    return(
        <div className={'custom-container alignment-center'}>
            <div style={{width: '50%'}}>
                <h2>You are already logged in!</h2>
            </div>
        </div>
    )
}

function LoginForm() {
    const doLogin = async () => {
        let data = {
            vid: vid,
            password: password
        }
        let query = await Api('login_user', "POST", data);
        let result = await query.json();
        if(!result.success){
            setErrorMessage(result.message);
        }
        else{
            localStorage.access_token = result.token;
            window.location.href="/";
        }
    }
    const handleChange = fn => e => {
        fn(e.target.value)
    }
    const [vid, setVid] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("");

    return (
        <div className={'custom-container alignment-center'}>
            <div style={{width: '50%'}}>
                <h2>LOG IN TO OUR VIRTUAL AIRLINE</h2>
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
                    label="PASSWORD:"
                    labelFor="signup-password"
                >
                    <InputGroup value={password}
                                onChange={handleChange(setPassword)}
                                id="signup-password"
                                placeholder="Your password"
                                intent={password ? "":"danger"}
                                type={"password"}
                    />
                </FormGroup>
                <Button onClick={doLogin} large intent={'success'} outlined text={'LOG IN'} icon={'user'}/>
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
};

function Login() {
    let clf = PJ["use-ivao-auth"] ? LoginBlocked : (localStorage.access_token ? LoginSuccess : LoginForm);
    return clf();
}

export default Login;
