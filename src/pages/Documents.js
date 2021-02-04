import React, {useState, useEffect} from 'react';
import {Button, Card, Icon} from "@blueprintjs/core";
import Document from "./Document";
import Api from "../ApiManager";

function Documents() {
    let [docs, setDocs] = useState([]);
    let [selected, setSelected] = useState(false);
    const getDocuments = async () => {
        let resp = await Api('documents');
        let res = await resp.json();
        setDocs(await res);
    }
    useEffect(()=>{
        getDocuments();
    },[])
    const SelectDocument = i => () => {
        setSelected(i);
    }
    return (
        <div className={"custom-container"}>
            <h2>Documents library {selected ? <Button onClick={SelectDocument(false)} icon={'home'}/>:''}</h2>
            {selected ? <Document {...selected} />:
            <div className={"documents-container"}>
                {docs.map((i,e)=>{
                    return <Card interactive={true}
                                 elevation={1}
                                 key={'va_doc_'+e}
                                 className={"document_card"}
                                 onClick={SelectDocument(i)}
                    >
                        <Icon icon={'document'} iconSize={40} style={{float: "left"}}/> {i.name}
                    </Card>
                })}
            </div>}
        </div>
    )
}

export default Documents;
