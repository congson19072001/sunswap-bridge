import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

import {
    WBNB__factory,
    WBNB,
    WMATIC__factory,
    WMATIC,
    BridgePolygon__factory,
    BridgePolygon,
    BridgeBsc__factory,
    BridgeBsc,
} from "../typechain-types";

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const _BNB: WBNB__factory = await ethers.getContractFactory("WBNB");
    const _WMATIC: WMATIC__factory = await ethers.getContractFactory("WMATIC");
    const _BridgePolygon: BridgePolygon__factory =
        await ethers.getContractFactory("BridgePolygon");
    const _BridgeBsc: BridgeBsc__factory = await ethers.getContractFactory(
        "BridgeBsc",
    );

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );

    console.log("ACCOUNT: " + admin);

    const wmatic: WMATIC = await _WMATIC.deploy();
    console.log("WMATIC deployed at: ", wmatic.address);

    const wbnb: WBNB = await _BNB.deploy();
    console.log("WBNB deployed at: ", wbnb.address);

    const chainId = hre.network.config.chainId;

    if (chainId == 80001) {
        const wmatic_bridgePolygon: BridgePolygon = await _BridgePolygon.deploy(
            wmatic.address,
        );
        console.log(
            "wmatic_bridge_polygon deployed at: ",
            wmatic_bridgePolygon.address,
        );

        const wbnb_bridgePolygon: BridgePolygon = await _BridgePolygon.deploy(
            wbnb.address,
        );
        console.log(
            "wbnb_bridge_polygon deployed at: ",
            wbnb_bridgePolygon.address,
        );

        const contractAddress = {
            WMATIC: wmatic.address,
            WBNB: wbnb.address,
            WMATIC_BRIDGE_POLYGON: wmatic_bridgePolygon.address,
            WBNB_BRIDGE_POLYGON: wbnb_bridgePolygon.address,
        };

        fs.writeFileSync(
            "polygon_contracts.json",
            JSON.stringify(contractAddress),
        );
    } else if (chainId == 97) {
        const wmatic_bridgeBsc: BridgeBsc = await _BridgeBsc.deploy(
            wmatic.address,
        );
        console.log(
            "wmatic_bridge_bsc deployed at: ",
            wmatic_bridgeBsc.address,
        );

        const wbnb_bridgeBsc: BridgeBsc = await _BridgeBsc.deploy(wbnb.address);
        console.log("wbnb_bridge_bsc deployed at: ", wbnb_bridgeBsc.address);

        const contractAddress = {
            WMATIC: wmatic.address,
            WBNB: wbnb.address,
            WMATIC_BRIDGE_BSC: wmatic_bridgeBsc.address,
            WBNB_BRIDGE_BSC: wbnb_bridgeBsc.address,
        };

        fs.writeFileSync("bsc_contracts.json", JSON.stringify(contractAddress));
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
