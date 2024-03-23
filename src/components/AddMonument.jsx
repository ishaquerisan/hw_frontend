import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import imgIcon from "../static/img.svg";

const AddMonument = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) navigate("/login");
  const imageRef = useRef(null);
  const [filename, setFilename] = useState("No file chosen");
  const [coverImage, setCoverImage] = useState(imgIcon);

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
    formData.append("title", e.target.title.value);
    // formData.append("shortdescription", e.target.shdes.value);
    formData.append("description", e.target.des.value);
    formData.append("nation", e.target.nat.value);
    formData.append("state", e.target.state.value);
    formData.append("place", e.target.place.value);
    formData.append("location", e.target.loc.value);
    formData.append("ipms_place", e.target.ipms_place.value);
    formData.append("archi_imps", e.target.archi_imps.value);
    // formData.append("hst_chronology", e.target.hst_chronology.value);
    formData.append("past_condition", e.target.past_condition.value);
    formData.append("present_condition", e.target.present_condition.value);
    formData.append("cover_image", imageRef.current.files[0]);

    axios
      .post("/monuments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Monument Created");
        navigate("/manage/ListMonuments");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="formcon">
      <div className="formcard">
        <div className="head">Add Monument </div>
        <form onSubmit={submit}>
          <div className="inp">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" id="title" />
          </div>

          <div className="inp">
            <label htmlFor="des">Description/About Monuments</label>
            <textarea name="description" id="des" />
          </div>
          {/* <div className="inp">
            <label htmlFor="shdes">Short Description</label>
            <textarea name="shortdescription" id="shdes" />
          </div> */}
          <div className="inp">
            <label htmlFor="nat">Nation</label>
            <input name="nation" type="text" id="nat" />
          </div>
          <div className="inp">
            <label htmlFor="state">State</label>
            <input name="state" type="text" id="state" />
          </div>
          <div className="inp">
            <label htmlFor="place">Place</label>
            <input name="place" type="text" id="place" />
          </div>
          <div className="inp">
            <label htmlFor="location">Location</label>
            <input name="location" type="text" id="loc" />
          </div>
          <div className="inp">
            <label htmlFor="ipms_place">Importance of a Place</label>
            <input name="ipms_place" type="text" id="ipms_place" />
          </div>
          <div className="inp">
            <label htmlFor="archi_imps">Architectural Importance</label>
            <input name="archi_imps" type="text" id="archi_imps" />
          </div>
          {/* <div className="inp">
            <label htmlFor="hst_chronology">Historical Chronology</label>
            <input name="hst_chronology" type="text" id="hst_chronology" />
          </div> */}
          <div className="inp">
            <label htmlFor="past_condition">Past Condition of Place</label>
            <input name="past_condition" type="text" id="past_condition" />
          </div>
          <div className="inp">
            <label htmlFor="present_condition">
              Present Condition of a Place
            </label>
            <input
              name="present_condition"
              type="text"
              id="present_condition"
            />
          </div>

          <div className="inp">
            <label htmlFor="cover_image">cover Image/Video</label>
            <div className="fileSelect">
              <div className="filebtncon">
                <label htmlFor="cover_image" className="fileopen btn">
                  <span>Open file</span>
                </label>
                <p className="filename">{filename}</p>
              </div>
              <input
                name="cover_image"
                type="file"
                id="cover_image"
                ref={imageRef}
                onChange={handleChange}
              />

              <img
                src={coverImage}
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

export default AddMonument;
