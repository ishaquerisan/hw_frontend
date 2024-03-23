import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import imgIcon from "../static/img.svg";

const AddGallery = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) navigate("/login");

  const [filename, setFilename] = useState("No file chosen");
  const { id } = useParams();
  const imageRef = useRef(null);
  const [Image, setImage] = useState(imgIcon);

  function setImgSrc(files) {
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.querySelector(".file-image-display").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  }

  function handleChange(e) {
    const files = e.target.files;
    setFilename(files[0].name);
    setImgSrc(files);
  }
  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imgTitle", e.target.imgTitle.value);
    // formData.append("description", e.target.description.value);
    formData.append("image", imageRef.current.files[0]);

    axios
      .post(`/gallery/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Gallery Created");
        navigate(`/manage/gallery/${id}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="formcon">
      <div className="formcard">
        <div className="head">Add Gallery </div>
        <form onSubmit={submit}>
          <div className="inp">
            <label htmlFor="imgTitle">Title</label>
            <input name="imgTitle" type="text" id="imgTitle" />
          </div>

          {/* <div className="inp">
            <label htmlFor="des">Description</label>
            <textarea name="description" id="des" />
          </div> */}

          {/* <div className="inp">
            <label htmlFor="image">Image/Video</label>
            <input name="image" type="file" id="image" ref={imageRef} />
          </div> */}
          <div className="inp">
            <label htmlFor="image">Image/Video</label>{" "}
            <div className="fileSelect">
              <div className="filebtncon">
                <label htmlFor="image" className="fileopen btn">
                  <span>Open file</span>
                </label>
                <p className="filename">{filename}</p>
              </div>
              <input
                name="image"
                type="file"
                id="image"
                ref={imageRef}
                onChange={handleChange}
              />

              <img
                src={Image}
                alt="Old Cover Image"
                className="file-image-display"
              />
            </div>
          </div>

          <div className="sub">
            <input type="submit" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGallery;
