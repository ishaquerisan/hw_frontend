import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import imgIcon from "../static/img.svg";

const EditGallery = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) navigate("/login");

  const [filename, setFilename] = useState("No file chosen");
  const { id } = useParams();
  const imageRef = useRef(null);
  const [galleryData, setGalleryData] = useState({
    imgTitle: "",
    // description: "",
    image: "",
  });
  const [thumbnail, setThumbnail] = useState(imgIcon);

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
    setGalleryData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (files[0].type.startsWith("video")) {
      setThumbnail(URL.createObjectURL(files[0]));
    }
  }

  useEffect(() => {
    axios
      .get(`gallery/${id}`)
      .then((res) => {
        const { data } = res;
        setGalleryData(res.data);
        if (data.image) {
          setThumbnail(axios.defaults.baseURL + data.image);
          setFilename(data.image);
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching gallery data:",
          err.response.data.message
        );
      });
  }, [id]);

  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imgTitle", e.target.imgTitle.value);
    // formData.append("description", e.target.description.value);
    formData.append("image", imageRef.current.files[0]);

    axios
      .put(`gallery/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Gallery Updated");
        navigate(`/manage/gallery/${galleryData.monumentId}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="formcon">
      <div className="formcard">
        <div className="head">Edit Gallery </div>
        <form onSubmit={submit}>
          <div className="inp">
            <label htmlFor="imgTitle">Title</label>
            <input
              name="imgTitle"
              type="text"
              id="imgTitle"
              defaultValue={galleryData.imgTitle}
            />
          </div>

          {/* <div className="inp">
            <label htmlFor="des">Description</label>
            <textarea
              name="description"
              id="des"
              defaultValue={galleryData.description}
            />
          </div> */}

          {/* <div className="inp">
            <label htmlFor="image">Image/Video</label>
            <input name="image" type="file" id="image" ref={imageRef} />
          </div> */}
          <div className="inp">
            <label htmlFor="image">Image/Video</label>
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
                onChange={handleChange}
                ref={imageRef}
              />

              {imageRef.current?.files[0] &&
              imageRef.current.files[0].type.startsWith("video") ? (
                <video controls className="file-image-display">
                  <source src={thumbnail} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="file-image-display"
                />
              )}
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

export default EditGallery;
