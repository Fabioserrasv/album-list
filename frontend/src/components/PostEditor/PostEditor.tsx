
import  { useRef } from "react";
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
    '/', // Line break
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', 'image', 'video',
    'audio' /** ,'math' */ ], // You must add the 'katex' library at options to use the 'math' plugin.
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['fullScreen', 'showBlocks'],
    ['save']
    /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
  ]
}

export function PostEditor(){
    const editor = useRef<SunEditorCore>();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
     const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };
    return (<SunEditor getSunEditorInstance={getSunEditorInstance} setOptions={{buttonList:getButtonList()}} />);
};