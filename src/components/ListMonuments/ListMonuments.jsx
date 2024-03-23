import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./ListMonuments.css";

const ListMonuments = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    axios
      .get("monuments/")
      .then((res) => {
        setData(res.data["monument"]);
        setIsAdmin(res.data["userType"] == "admin" ? true : false);
      })
      .catch((err) => console.error(err.response.data.message));
  }, []);

  function handleItemClick(placeId) {
    window.scrollTo(0, 0);
    navigate(`/places/${placeId}`);
  }

  function deleteMonument(id) {
    let isDel = confirm("Confirm Delete");
    if (isDel) {
      axios
        .delete(`monuments/${id}`)
        .then((res) => {
          setData((currentData) => currentData.filter((m) => m._id != id));
        })
        .catch((err) => {
          alert("Delete Error: Could not be deleted");
        });
    }
  }
  return (
    <div className="container">
      <div className="topbar">
        <div className="main-head">Monuments</div>
        <Link to={"/manage/monument/create"}>
          <button className="btn">Create</button>
        </Link>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              {/* <th>short Description</th> */}
              <th>Description</th>
              <th>Place</th>
              <th>State</th>
              <th>Image</th>
              <th>Status</th>
              <th>Gallery</th>
              <th>
                <span className="material-symbols-outlined tool">
                  more_vert
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((monument, index) => (
              <tr key={monument._id}>
                <td>{index + 1}</td>
                <td>{monument.title}</td>
                {/* <td>{monument.shortdescription}</td> */}
                <td>{monument.description}</td>
                <td>{monument.place}</td>
                <td>{monument.state}</td>
                {/* <td>{monument.cover_image}</td> */}
                <td>
                  {monument.cover_image &&
                  monument.cover_image.endsWith(".mp4") ? (
                    <video className="image-display" controls>
                      <source
                        src={axios.defaults.baseURL + monument.cover_image}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={axios.defaults.baseURL + monument.cover_image}
                      alt="Cover Media"
                      className="image-display"
                    />
                  )}
                </td>
                <td>
                  <div className="dataAlign">
                    {monument.status == 1 ? (
                      <span className="YES">Verified</span>
                    ) : (
                      <span className="NO">Pending</span>
                    )}
                    {isAdmin ? (
                      <button
                        className="btn"
                        onClick={() => handleItemClick(monument._id, true)}
                      >
                        Verification
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => handleItemClick(monument._id)}
                      >
                        View
                      </button>
                    )}
                  </div>
                </td>
                <td className="icons">
                  <div className="tool-con">
                    <Link to={`/manage/gallery/${monument._id}`}>
                      <span className="material-symbols-outlined tool gal">
                        photo_library
                      </span>
                    </Link>
                  </div>
                </td>
                <td className="icons">
                  <div className="tool-con">
                    <Link to={`/manage/monument/edit/${monument._id}`}>
                      <span className="material-symbols-outlined tool edit">
                        edit_square
                      </span>
                    </Link>
                    <span
                      className="material-symbols-outlined tool del"
                      onClick={() => deleteMonument(monument._id)}
                    >
                      delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMonuments;
