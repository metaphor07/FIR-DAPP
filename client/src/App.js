import Navbar from "./components/navbar/Navbar";
import ComplainDetail from "./pages/complainDetail/ComplainDetail";
import CreateComplain from "./pages/createComplain/CreateComplain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useContext, useEffect } from "react";
import Web3 from "web3";
import Fir from "./artifacts/contracts/Fir.sol/Fir.json";
import { connectFailure, connectSuccess } from "./context/Action";
import { Context } from "./context/Context";
import { CONTRACT_ADDRESS } from "./contract_add";
import ABI from "./ABI.json";

function App() {
  const { address, dispatch } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        const address = await web3.eth.getAccounts();
        dispatch(
          connectSuccess({
            web3: web3,
            contract: contract,
            address: address[0],
          })
        );
      } catch (error) {
        alert("*Plz Install Metamask!");
        dispatch(connectFailure());
      }
    };
    getData();
  }, []);
  console.log(address);
  return (
    <div className="App" style={{ position: "relative" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/complain/:name" element={<ComplainDetail />} />
          <Route path="/createComplain" element={<CreateComplain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
