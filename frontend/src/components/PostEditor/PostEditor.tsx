
import { useRef, forwardRef, useImperativeHandle, useCallback } from "react";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

function getButtonList(){
  return [
    ['undo', 'redo'],
    ['fontSize', 'formatBlock'],
    ['blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    '/',
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['link', 'image', 'video' ],
    ['save']
    /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
  ]
}


export type RefPostEditor = {
  getText(): string;
  clear(): void;
}

type PostEditorProps = {}

export const PostEditor = forwardRef<RefPostEditor, PostEditorProps>((
  _props,
  ref
) => {
    const editor = useRef<SunEditorCore>();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
      editor.current = sunEditor;
    };

    const getText = useCallback(() =>  editor.current?.getContents(true) || '', []);
    const clear = useCallback(() => editor.current?.setContents(""), []);

    useImperativeHandle(ref, () => ({
      getText,
      clear
    }), [getText])

    return (<SunEditor getSunEditorInstance={getSunEditorInstance} setOptions={{buttonList:getButtonList()}} />);
});