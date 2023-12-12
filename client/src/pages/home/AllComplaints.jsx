import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { daysLeft } from "../../utils";

const AllComplaints = ({ contract, address, complains }) => {
  return (
    <section className="complain-section">
      <h1 className="title">All Complaints ({complains?.length}) </h1>
      {contract && address ? (
        <div className="card-wrapper">
          {complains?.map((complain, i) => {
            return (
              <NavLink
                key={i}
                to={`/complain/${complain?.name}`}
                state={{ complain, i }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="complain-card">
                  <div className="card-img">
                    {complain?.imgProof ? (
                      <img
                        src={`https://gateway.pinata.cloud/ipfs/${complain?.imgProof}`}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <img
                        src="https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg?cs=srgb&dl=pexels-kat-wilcox-923681.jpg&fm=jpg"
                        alt=""
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                  <div className="card-text">
                    <div className="text1">
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "white",
                        }}
                      >
                        {complain?.name}
                      </span>
                      <span style={{ color: "white", fontSize: "14px" }}>
                        {daysLeft(complain?.createdAt)}
                      </span>
                    </div>
                    <div className="text2">
                      <span>{complain?.description}</span>
                    </div>
                    <div className="text3">
                      <span
                        style={{
                          fontSize: "10px",
                          width: "230px",
                          overflow: "hidden",
                          color: "white",
                        }}
                      >
                        {complain?.owner}
                      </span>
                      {complain?.solved ? (
                        <span
                          style={{
                            // backgroundColor: "green",
                            color: "green",
                            padding: "2px 3px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          solved
                        </span>
                      ) : (
                        <span
                          style={{
                            // backgroundColor: "red",
                            color: "red",
                            padding: "2px 3px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Not solved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      ) : (
        "No complaints Yet!"
      )}
    </section>
  );
};

export default AllComplaints;
