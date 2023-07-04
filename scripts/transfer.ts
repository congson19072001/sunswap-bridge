import Web3 from "web3";
const web3 = new Web3("http://localhost:8545");
const nonce = 6; //Need to increment this for each new transfer
const amount = 7000000000000000000;
if (web3) {
    const message = web3?.utils
        ?.soliditySha3(
            { t: "address", v: "0x9B3e650312B37858fEF9Cc0238ff0adE1F94F774" },
            { t: "address", v: "0x9B3e650312B37858fEF9Cc0238ff0adE1F94F774" },
            { t: "uint256", v: amount },
            { t: "uint256", v: nonce },
        )
        ?.toString();
    console.log(message);
}
