import React, {useEffect, useState} from 'react';
import Api from "../ApiManager";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Button, Switch} from "@blueprintjs/core";

const Document = (props) => {
    const [doc, setDoc] = useState({});
    const [content, setContent] = useState("")
    const [canEdit, setCanEdit] = useState(false)
    const [edt, setEdt] = useState();
    const getDocument = async () => {
        let resp = await Api(`document/${props['id']}`);
        let res = await resp.json();
        setDoc(await res);
    }
    useEffect(()=>{
        getDocument();
    },[])
    useEffect(() => {
        if(!canEdit && edt)
            edt.ui.view.toolbar.element.remove();
    }, [canEdit]);
    return <div className={"custom-container"}>
        <h2>{doc.name}</h2>
        <hr/>
        Edit document: <Switch checked={canEdit} onChange={()=>{setCanEdit(!canEdit)}}/>
        {canEdit ?
            <CKEditor
                editor={ClassicEditor}
                data={doc.body}
                onReady={editor => {
                    editor.ui.view.toolbar.element.remove();
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    setEdt(editor);
                }}
                onChange={(event, editor) => {
                    setContent(editor.getData());
                }}
            /> :
            <div dangerouslySetInnerHTML={{__html: doc.body}}></div>
        }
        {canEdit ?
        <Button onClick={()=>{Api(`document/save/${props['id']}`, 'POST', {content:content})}} icon={'saved'}/>:
            []}
    </div>
}
export default Document