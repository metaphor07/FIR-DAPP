import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { daysLeft } from "../../utils";
const Home = () => {
  const { contract, address } = useContext(Context);
  const navigate = useNavigate();
  const projects = [1, 2, 3, 4, 5];
  const [complains, setComplains] = useState();

  useEffect(() => {
    const getAllComplain = async () => {
      try {
        const res = await contract.methods.allComplain().call();
        setComplains(res);
      } catch (error) {
        alert(
          "**Some thing went wrong! Plz refresh the page or do after some time"
        );
      }
    };
    contract && getAllComplain();
  }, [contract]);

  console.log(complains);
  return (
    <div className="main_header">
      <div className="header_wrapper">
        {/* Left side */}
        <div className="main_header_left">
          <h1>
            <span style={{ color: "rgb(217, 0, 255)" }}>DECENTRALIZED</span>{" "}
            Online <span style={{ color: "rgb(4, 171, 169)" }}>FIR</span> system
          </h1>
          <p>
            Lodge your complain here. No one can delete or manipulate your's
            complain. It is a decentralized complain system based on Blockchain
            technology, your complains are stored in the blockchain which never
            gonna be deleted by any one.
          </p>
          <span style={{ fontSize: "1rem" }}>
            *You can lodge you complain by clicking bellow button.
          </span>
          <button
            onClick={() =>
              address
                ? navigate("createComplain")
                : alert("**Plz Install Metamask first!")
            }
          >
            Lodge a Complain
          </button>
        </div>

        {/* Right Side */}
        <div className="main_header_right">
          <img
            src="https://www.indiafilings.com/learn/wp-content/uploads/2016/03/FIR-Filing.jpg"
            alt=""
          />
        </div>
      </div>

      {/* All Campaigns */}
      <section className="complain-section">
        <h1 className="title">All Complains ({complains?.length}) </h1>
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
                    <div className="card-img" style={{ width: "90%" }}>
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
                            fontSize: "22px",
                            fontWeight: "400",
                            color: "white",
                          }}
                        >
                          {complain?.name}
                        </span>
                        <span style={{ color: "white" }}>
                          {daysLeft(complain?.createdAt)}
                        </span>
                      </div>
                      <div className="text2">
                        <span>{complain?.description}</span>
                      </div>
                      <div className="text3">
                        <span
                          style={{
                            fontSize: "12px",
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
                              backgroundColor: "green",
                              color: "white",
                              padding: "2px 3px",
                            }}
                          >
                            solved
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              padding: "2px 3px",
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
          "No complains Yet!"
        )}
      </section>
    </div>
  );
};

export default Home;
