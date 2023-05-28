import React, { useContext } from "react";
import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { address } = useContext(Context);

  return (
    <div className="navbarContainer">
      <div className="navwrapper">
        {/* left side */}
        <div className="navleft">
          <span className="language">EN</span>
          <div className="searchContainer">
            <input type="text" className="input" placeholder="search..." />
            <SearchOutlinedIcon
              style={{ color: "white", fontsize: 16, cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Center */}
        <div className="navcenter">
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="navTitle">FIR System</h1>
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
