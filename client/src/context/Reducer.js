const Reducer = (state, action) => {
  switch (action.type) {
    case "CONNECT_SUCCESS":
      return {
        web3: action.payload.web3,
        contract: action.payload.contract,
        address: action.payload.address,
        error: false,
      };

    case "CONNECT_FAILURE":
      return {
        web3: null,
        contract: null,
        address: null,
        error: true,
      };
  }
};

export default Reducer;
