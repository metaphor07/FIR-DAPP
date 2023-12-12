import React, { useContext, useState } from "react";
import "./createComplain.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
const CreateComplain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [vidFile, setVidFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imghash, setImghash] = useState("");
  const [vidhash, setVidhash] = useState("");

  const navigate = useNavigate();
  const { contract, address } = useContext(Context);

  const uploadComplain = async () => {
    console.log(imghash);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let imgHash = null;
    let vidHash = null;
    if (imgFile) {
      try {
        const formData = new FormData();
        formData.append("file", imgFile);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `10752744f0dcd25bd83b`,
            pinata_secret_api_key: `743b5224582b2de63d84832a5f87c234b9741f809b09c6aeac66b4efacd943a1`,
            "Content-Type": "multipart/form-data",
          },
        });
        imgHash = resFile.data.IpfsHash;
      } catch (error) {
        console.log(error);
      }
    }
    if (vidFile) {
      try {
        const formData = new FormData();
        formData.append("file", vidFile);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `10752744f0dcd25bd83b`,
            pinata_secret_api_key: `743b5224582b2de63d84832a5f87c234b9741f809b09c6aeac66b4efacd943a1`,
            "Content-Type": "multipart/form-data",
          },
        });
        vidHash = resFile.data.IpfsHash;
      } catch (error) {
        console.log(error);
      }
    }
    console.log(imgHash, vidHash);

    try {
      if (imgHash && vidHash) {
        await contract.methods
          .createComplain(address, title, desc, imgHash, vidHash)
          .send({ from: address });
        alert("*Complain Lodged successfully...");
      } else if (imgHash && !vidHash) {
        await contract.methods
          .createComplain(address, title, desc, imgHash, "")
          .send({ from: address });
        alert("*Complain Lodged successfully...");
      } else if (!imgHash && vidHash) {
        await contract.methods
          .createComplain(address, title, desc, "", vidHash)
          .send({ from: address });
        alert("*Complain Lodged successfully...");
      } else {
        await contract.methods
          .createComplain(address, title, desc, "", "")
          .send({ from: address });
        alert("*Complain Lodgedd successfully...");
      }
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      alert("*Something went wrong! plz try again");
      setIsLoading(false);
    }
  };
  const retrieveImgFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setImgFile(e.target.files[0]);
    };
    // setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const retrieveVidFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setVidFile(e.target.files[0]);
    };
    // setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="write">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="writeWrapper">
          <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
              {/* <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label> */}

              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="writeInput"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="writeFormGroup">
              <textarea
                placeholder="Write the incident properly... [***please note that, write about yourself(like address, phone no., etc) and any suspect(with their proper information) and also write incident date and place***]"
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="writeFormGroup">
              <div className="proofSection">
                <span className="proofTitle">Upload Proof, If you have:-</span>
                <label htmlFor="fileInputImg" className="proofFile">
                  {imgFile ? imgFile.name : "photo"}
                </label>
                <input
                  type="file"
                  id="fileInputImg"
                  accept=".jpg,.jpeg,.png"
                  style={{ display: "none" }}
                  onChange={retrieveImgFile}
                />

                <label htmlFor="fileInputVid" className="proofFile">
                  {vidFile ? vidFile.name : "video"}
                </label>
                <input
                  type="file"
                  id="fileInputVid"
                  accept=".mp4"
                  style={{ display: "none" }}
                  onChange={retrieveVidFile}
                />
              </div>
            </div>
            <button className="writeSubmit" type="submit">
              Lodge
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateComplain;
