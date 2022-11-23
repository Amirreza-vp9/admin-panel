import React, { useState, useContext } from "react";
import { DataContext } from "../dataProvider";
import "../styles/addNews.css";
import * as AiIcons from "react-icons/ai";

const AddNews = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [about, setAbout] = useState("");
  const [fie, setFile] = useState("");
  const [imgCondition, setImgCondition] = useState(false);
  const { menuIsOpen } = useContext(DataContext);
  const { data, setData } = useContext(DataContext);

  const submit = () => {
    const clone = { ...data };
    clone.news[1].push({
      id: id,
      name: name,
      address: address,
      about: about,
    });
    setData(clone);
  };

  const uploadImg = () => {
    setImgCondition(true);
  };

  return (
    <div className={menuIsOpen ? "allNews-b" : "allNews"}>
      <div className="addNews">
        <button className="addImgBtn" onClick={uploadImg}>
          آپلود تصویر
        </button>
        <div className="forms">
          <div className="form">
            <h4>تیتر خبر</h4>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form">
            <h4>درباره خبر</h4>
            <input
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="form">
            <h4>Id تور</h4>
            <input
              className="input"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form">
            <h4>متن خبر</h4>
            <textarea
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <button className="submitNewsBtn" onClick={submit}>
          تایید
        </button>
        {imgCondition ? (
          <div className="modal">
            <AiIcons.AiOutlineClose
              className="closeIcon"
              onClick={() => setImgCondition(false)}
            />
            <h3>آپلود تصویر</h3>
            <input
              type="file"
              className="file-input"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddNews;
