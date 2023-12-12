import React, { useContext, useState } from "react";
import "./complainDetail.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import Loader from "../../components/loader/Loader";
import { daysLeft } from "../../utils";

const ComplainDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const location = useLocation().state;
  const data = location.complain;
  const { contract, address } = useContext(Context);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await contract.methods.solve(address, location.i).send({ from: address });
      setUpdateMode(false);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      alert("**Something went wrong! plz try again later");
    }
  };

  return (
    <div className="singlePost">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="singlePostWrapper">
          <div className="photoWrapper">
            {data?.imgProof ? (
              <div className="photoItem">
                <NavLink
                  to={`https://gateway.pinata.cloud/ipfs/${data?.imgProof}`}
                >
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${data?.imgProof}`}
                    alt=""
                    className="imgProof"
                  />
                </NavLink>
                <span style={{ color: "lightgray" }}>
                  *click the item to see properly
                </span>
              </div>
            ) : (
              <div className="photoItem">
                <img
                  src="https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg?cs=srgb&dl=pexels-kat-wilcox-923681.jpg&fm=jpg"
                  alt=""
                  className="imgProof"
                />
              </div>
            )}

            {data?.vidProof ? (
              <div className="videoItem">
                <NavLink
                  to={`https://gateway.pinata.cloud/ipfs/${data?.vidProof}`}
                >
                  <video
                    controls
                    className="vidProof"
                    src={`https://gateway.pinata.cloud/ipfs/${data?.vidProof}`}
                  />
                </NavLink>
                <span style={{ color: "lightgray" }}>
                  *click the item to see properly
                </span>
              </div>
            ) : (
              <div className="videoItem">
                <img
                  className="vidProof"
                  src="https://baj.by/sites/default/files/event/preview/thumb-padrao-video.png"
                />
              </div>
            )}
          </div>

          <h3
            style={{
              fontWeight: "100",
              textAlign: "center",
              margin: "10px 0px",
              paddingBottom: "5px",
              borderBottom: "1px solid white",
            }}
          ></h3>
          <h1 className="singlePostTitle">
            {data?.owner === address && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
              </div>
            )}
          </h1>

          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Name:
              <b> {data?.name}</b>
            </span>
            <span className="singlePostDate">{daysLeft(data?.createdAt)}</span>
          </div>

          <p className="singlePostDesc">{data?.description}</p>

          <div className="otherDetails">
            <span>Other Details:-</span>
            <div className="details">
              <div className="owner">
                <span>Owner: </span>
                <span>{data?.owner}</span>
              </div>

              <div className="contact">
                <span>Solved: </span>
                {data?.solved ? (
                  <span style={{ color: "green" }}>Solved</span>
                ) : (
                  <span style={{ color: "red" }}>Not Solved</span>
                )}
              </div>
            </div>
          </div>
          {updateMode && (
            <>
              <button className="singlePostButton" onClick={handleUpdate}>
                Solved
              </button>
              <span style={{ color: "green", alignSelf: "flex-end" }}>
                *Click if the problem is solved!
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplainDetail;
