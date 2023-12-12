import React, { useContext, useState } from "react";
import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { contract, address } = useContext(Context);
  const [find, setFind] = useState("");
  const [complaints, setComplaints] = useState();
  const [match, setMatch] = useState();
  const navigate = useNavigate();

  const getAllComplain = async () => {
    try {
      const res = await contract.methods.allComplain().call();
      setComplaints(res);
    } catch (error) {
      alert(
        "**Some thing went wrong! Plz refresh the page or do after some time"
      );
    }
  };

  // funtion to navigate the search result
  const navigateToOtherComponent = () => {
    navigate("/", { state: { match } });
  };

  const matchName = (ele, lName) => {
    const getName = ele.name;
    const getNamel = getName.toLowerCase();
    // console.log(getNamel, lName);
    return getNamel == lName;
  };
  const findFir = async () => {
    if (find == "") {
      alert("plz write something first!");
    } else {
      contract && getAllComplain();
      if (find[0] == "0") {
        setMatch(complaints?.filter((ele) => ele.owner === find));
        // console.log("address");
      } else {
        const lName = find.toLowerCase();
        setMatch(complaints?.filter((ele) => matchName(ele, lName)));
        // console.log(lName);
      }
      match && navigateToOtherComponent();
    }
  };
  // console.log(match);

  return (
    <div className="navbarContainer">
      <div className="navwrapper">
        {/* left side */}
        <div className="navleft">
          <span className="language">EN</span>
          <div className="searchContainer">
            <input
              type="text"
              className="input"
              placeholder="search by name/address"
              value={find}
              onChange={(e) => setFind(e.target.value)}
            />
            <SearchOutlinedIcon
              style={{ color: "white", fontsize: 16, cursor: "pointer" }}
              onClick={findFir}
            />
          </div>
        </div>

        {/* Center */}
        <div className="navcenter">
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src="data:image/png;base64,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"
              alt="logo"
              className="logoImg"
            />
            <h1 className="navTitle">nline FIR System</h1>
          </NavLink>
        </div>

        {/* Right */}
        <div className="navright">
          {address ? (
            <div className="connect">connected</div>
          ) : (
            <div className="notConnect">Not Connected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
