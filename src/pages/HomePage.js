import React from 'react';
import {Callout} from '@blueprintjs/core'
function HomePage() {
    return (
        <div className={'custom-container'}>
            <h2>Hi there! I'm a demonstrator page of your new Virtual Airline</h2>
            <p>You can modify this page by edit <code>pages/HomePage.js</code></p>
            <p>I'm using ReactJS platform and BlueprintJS UI</p>
            <Callout className={'bp3-ui-text bp3-running-text'}>
                <h4>IMPORTANT THINGS BEFORE YOU START!</h4>
                <ul>
                    <li>This application distribute "AS IS" under GPL license.
                        You are free to change it on your own way</li>
                    <li>Please pay attention to <code className={'bp3-code'}>package.json</code> file.</li>
                    <li>I'm using <a href={"https://github.com/bth2008/va-manager-api"}>VA MANAGER API</a> so
                        you need to properly set up it first!</li>
                    <li>First of all, change the <code className={'bp3-code'}>api-url</code> parameter, so it's should points to API root
                    accessible from worldwide web</li>
                    <li>Next, you can choose login procedure: <code className={'bp3-code'}>use-ivao-auth</code> parameter switches between
                        classic <b>"Signup / Signin"</b> and <b>"IVAO OAUTH"</b> services. If it sets to true, you should find
                        <b>"Login with IVAO"</b> button in top right corner of the page. If it set's to false, you will
                        find the two buttons <b>"Signup"</b> and <b>"Login"</b> with necessary form controls</li>
                    <li><b>Please pay attention that if you choose IVAO OAUTH authorization procedure, you should
                        gets <a href={"https://login.ivao.aero/request_api.php"}>special approvance</a> for your
                        domain from IVAO </b></li>
                    <li>Next, change the <code className={'bp3-code'}>website-url</code> that should points to this page
                        without any routes, accessible anywhere from worldwide web</li>
                    <li>Finally, you can change <code className={'bp3-code'}>airline</code> parameter for naming on
                        web pages on this site</li>
                </ul>
            </Callout>
        </div>
    )
}

export default HomePage;