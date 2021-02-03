import PJ from '../package.json';

const ApiManager = async (path, method="GET", data=null) => {
    let headers = {
            "Content-Type": "application/json"
    };
    let response;
    if(localStorage.access_token){
        headers["Authorization"] =  "Bearer " + localStorage.access_token;
    }
    if( method === "GET") {
        response = await fetch(PJ["api-uri"] + "/" + path, {
            headers: headers,
            method: method
        });
    }
    else{
        response = await fetch(PJ["api-uri"] + "/" + path, {
            headers: headers,
            method: method,
            body: JSON.stringify(data),
        });
    }
    return response;
}

export default ApiManager;