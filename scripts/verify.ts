import * as hre from "hardhat";
import * as bsc_contracts from "../bsc_contracts.json";
import * as polygon_contracts from "../polygon_contracts.json";

async function main() {
    try {
        const chainId = hre.network.config.chainId;

        if (chainId == 80001) {
            await hre.run("verify:verify", {
                address: polygon_contracts.WMATIC,
                hre,
            });
            console.log("verified polygon WMATIC");

            await hre.run("verify:verify", {
                address: polygon_contracts.WBNB,
                hre,
            });
            console.log("verified polygon WBNB");

            await hre.run("verify:verify", {
                address: polygon_contracts.WBNB_BRIDGE_POLYGON,
                constructorArguments: [polygon_contracts.WBNB],
                contract: "contracts/BridgePolygon.sol:BridgePolygon",
                hre,
            });
            console.log("verified polygon WBNB_BRIDGE_POLYGON");

            await hre.run("verify:verify", {
                address: polygon_contracts.WMATIC_BRIDGE_POLYGON,
                constructorArguments: [polygon_contracts.WMATIC],
                contract: "contracts/BridgePolygon.sol:BridgePolygon",
                hre,
            });
            console.log("verified polygon WMATIC_BRIDGE_POLYGON");
        } else if (chainId == 97) {
            await hre.run("verify:verify", {
                address: bsc_contracts.WMATIC,
                hre,
            });
            console.log("verified bsc WMATIC");

            await hre.run("verify:verify", {
                address: bsc_contracts.WBNB,
                hre,
            });
            console.log("verified bsc WBNB");

            await hre.run("verify:verify", {
                address: bsc_contracts.WBNB_BRIDGE_BSC,
                constructorArguments: [bsc_contracts.WBNB],
                contract: "contracts/BridgeBsc.sol:BridgeBsc",
                hre,
            });
            console.log("verified bsc WBNB_BRIDGE_BSC");

            await hre.run("verify:verify", {
                address: bsc_contracts.WMATIC_BRIDGE_BSC,
                constructorArguments: [bsc_contracts.WMATIC],
                contract: "contracts/BridgeBsc.sol:BridgeBsc",
                hre,
            });
            console.log("verified bsc WMATIC_BRIDGE_BSC");
        }
    } catch (err) {
        console.log("err >>", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
