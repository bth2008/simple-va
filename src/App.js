import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Link, Route } from "react-router-dom";
import {Navbar, Alignment, Button} from "@blueprintjs/core";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Documents from "./pages/Documents";

import PJ from "../package.json";
import ApiManager from "./ApiManager";

function App() {
    const processBeat = async () => {
        let res = await ApiManager('beat', "GET");
        let r = await res.json();
        if(!r.success && localStorage.access_token){
            localStorage.clear();
            window.location.reload();
        }
    }
    useEffect(() => {
        document.title = PJ.airline
        let intv = setInterval(processBeat, 10000);
        return ()=>{clearInterval(intv);};
    }, []);

  return (
    <div>
        <BrowserRouter>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>{PJ.airline}</Navbar.Heading>
                <Navbar.Divider />
                <Link to={'/'}><Button className="bp3-minimal" icon="home" text="Home" /></Link>
                <Link to={'/docs'}><Button className="bp3-minimal" icon="document" text="Documents" /></Link>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                {PJ["use-ivao-auth"] && !localStorage.access_token ?
                    <a href={"https://login.ivao.aero/index.php?url="+PJ["website-url"]+"/ivao_login_process"}>
                        <Button className={"bp3-minimal"} icon={"log-in"} text={"Login with IVAO"}/>
                    </a>:
                    <span>
                        {localStorage.signedup !== "true" && !localStorage.access_token &&
                        <Link to={'/signup'}>
                            <Button className={"bp3-minimal"} icon={"user"} text={"Signup"}/>
                        </Link>}
                        {localStorage.access_token ?
                            <Button className={"bp3-minimal"} icon={"log-out"} text={"Logout"}
                            onClick={()=>{localStorage.clear(); window.location.reload();}}/>
                            :
                            <Link to={'/login'}>
                            <Button className={"bp3-minimal"} icon={"log-in"} text={"Login"}/>
                            </Link>
                        }
                    </span>
                }
            </Navbar.Group>
        </Navbar>
        <Switch>
            <Route path={"/login"}>
                <Login/>
            </Route>
            <Route path={"/signup"}>
                <SignUp/>
            </Route>
            <Route path={"/docs"}>
                <Documents/>
            </Route>
            <Route path={"/ivao_login_process"}>
                {()=> {
                    let at = window.location.search.split("?IVAOTOKEN=")[1];
                    if(at && typeof(at)!== "undefined"){
                        localStorage.access_token = at;
                        window.location.href="/";
                    }
                    return <div></div>
                }}
            </Route>
            <Route path={"/"}>
                <HomePage/>
            </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
