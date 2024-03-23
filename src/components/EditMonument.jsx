import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import imgIcon from "../static/img.svg";

const EditMonument = () => {
  const [monument, setMonument] = useState({
    title: "",
    shortdescription: "",
    description: "",
    nation: "",
    state: "",
    place: "",
    location: "",
    ipms_place: "",
    archi_imps: "",
    hst_chronology: "",
    past_condition: "",
    present_condition: "",
    cover_image: null,
  });
  const [filename, setFilename] = useState("No file chosen");
  const navigate = useNavigate();
  const { id } = useParams();
  const monumentEndpoint = `monuments/${id}`;
  const [coverImage, setCoverImage] = useState(imgIcon); // State variable for old cover image URL

  if (!localStorage.getItem("token")) navigate("/login");

  useEffect(() => {
    axios
      .get(monumentEndpoint)
      .then((res) => {
        const { data } = res;
        setMonument(data);
        if (data.cover_image) {
          setCoverImage(axios.defaults.baseURL + data.cover_image);
          setFilename(data.cover_image.split("\\")[1]);
        }
      })
      .catch((err) => {
        console.error("Error fetching monument:", err);
      });
  }, [monumentEndpoint]);

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
    const { name, value, files } = e.target;
    setFilename(files[0].name);
    setImgSrc(files);
    setMonument((prevMonument) => ({
      ...prevMonument,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("shortdescription", shortdescription.value);
    formData.append("description", description.value);
    formData.append("nation", nation.value);
    formData.append("state", state.value);
    formData.append("place", place.value);
    formData.append("location", location.value);
    formData.append("ipms_place", ipms_place.value);
    formData.append("archi_imps", archi_imps.value);
    formData.append("hst_chronology", hst_chronology.value);
    formData.append("past_condition", past_condition.value);
    formData.append("present_condition", present_condition.value);
    formData.append("cover_image", monument.cover_image);

    axios
      .put(monumentEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Monument Updated");
        navigate("/manage/ListMonuments");
      })
      .catch((err) => {
        alert("Error updating monument: " + err);
      });
  }

  return (
    <div className="formcon">
      <div className="formcard">
        <div className="head">Edit Monument </div>
        <form onSubmit={handleSubmit}>
          <div className="inp">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              id="title"
              defaultValue={monument.title}
            />
          </div>

          <div className="inp">
            <label htmlFor="shortdescription">Short Description</label>
            <textarea
              name="shortdescription"
              id="shortdescription"
              defaultValue={monument.shortdescription}
            />
          </div>

          <div className="inp">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              defaultValue={monument.description}
            />
          </div>

          <div className="inp">
            <label htmlFor="nation">Nation</label>
            <input
              name="nation"
              type="text"
              id="nation"
              defaultValue={monument.nation}
            />
          </div>

          <div className="inp">
            <label htmlFor="state">State</label>
            <input
              name="state"
              type="text"
              id="state"
              defaultValue={monument.state}
            />
          </div>

          <div className="inp">
            <label htmlFor="place">Place</label>
            <input
              name="place"
              type="text"
              id="place"
              defaultValue={monument.place}
            />
          </div>

          <div className="inp">
            <label htmlFor="location">Location</label>
            <input
              name="location"
              type="text"
              id="location"
              defaultValue={monument.location}
            />
          </div>

          <div className="inp">
            <label htmlFor="ipms_place">Importance of a Place</label>
            <input
              name="ipms_place"
              type="text"
              id="ipms_place"
              defaultValue={monument.ipms_place}
            />
          </div>

          <div className="inp">
            <label htmlFor="archi_imps">Architectural Importance</label>
            <input
              name="archi_imps"
              type="text"
              id="archi_imps"
              defaultValue={monument.archi_imps}
            />
          </div>

          <div className="inp">
            <label htmlFor="hst_chronology">Historical Chronology</label>
            <input
              name="hst_chronology"
              type="text"
              id="hst_chronology"
              defaultValue={monument.hst_chronology}
            />
          </div>

          <div className="inp">
            <label htmlFor="past_condition">Past Condition of Place</label>
            <input
              name="past_condition"
              type="text"
              id="past_condition"
              defaultValue={monument.past_condition}
            />
          </div>

          <div className="inp">
            <label htmlFor="present_condition">
              Present Condition of a Place
            </label>
            <input
              name="present_condition"
              type="text"
              id="present_condition"
              defaultValue={monument.present_condition}
            />
          </div>
          <div className="inp">
            <label htmlFor="cover_image">Cover Image</label>
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

export default EditMonument;
