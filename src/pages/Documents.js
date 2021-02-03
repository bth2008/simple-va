import React, {useState, useEffect} from 'react';

import Api from "../ApiManager";

function Documents() {
    let [docs, setDocs] = useState([]);
    const getDocuments = async () => {
        let resp = await Api('documents');
        let res = await resp.json();
        setDocs(await res);
    }
    useEffect(()=>{
        getDocuments();
    },[])
    return (
        <div className={"custom-container"}>
            <h2>Documents library</h2>
            {docs}
        </div>
    )
}

export default Documents;
