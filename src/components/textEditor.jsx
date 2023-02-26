import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ editorRef, title }) => {
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={title}
      apiKey="qih2px1wds42lyotd7ozvyv4qn23cdcnomt0ezo09rwira4w"
      init={{
        height: 500,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        skin: "oxide-dark",
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #f6f6f6 }",
      }}
    />
  );
};

export default TextEditor;
