import { BigNumber, ethers, providers } from "ethers";
import {
    BridgePolygon__factory,
    BridgePolygon,
    BridgeBsc__factory,
    BridgeBsc,
} from "../typechain-types";
import * as dotenv from "dotenv";
import * as polygonContract from "../polygon_contracts.json";
import * as bnbContract from "../bsc_contracts.json";
import { formatEther } from "ethers/lib/utils";

dotenv.config();
async function main() {
    const bnbProvider = new providers.JsonRpcProvider(process.env.BSC_RPC);

    const bnbSigner = new ethers.Wallet(
        `${process.env.PRIVATE_KEY}`,
        bnbProvider,
    );

    const polygonProvider = new providers.JsonRpcProvider(
        process.env.POLYGON_RPC,
    );

    const BridgeBNBSide: BridgeBsc__factory = new BridgeBsc__factory(bnbSigner);

    const bnbSideBridge_WBNB: BridgeBsc = BridgeBNBSide.attach(
        bnbContract.WBNB_BRIDGE_BSC,
    );

    const bnbSideBridge_WMATIC: BridgeBsc = BridgeBNBSide.attach(
        bnbContract.WMATIC_BRIDGE_BSC,
    );

    const polygonSigner = new ethers.Wallet(
        `${process.env.PRIVATE_KEY}`,
        polygonProvider,
    );
    const BridgePolygonSide: BridgePolygon__factory =
        new BridgePolygon__factory(polygonSigner);

    const polygonSideBridge_WBNB: BridgePolygon = BridgePolygonSide.attach(
        polygonContract.WBNB_BRIDGE_POLYGON,
    );

    const polygonSideBridge_WMATIC: BridgePolygon = BridgePolygonSide.attach(
        polygonContract.WMATIC_BRIDGE_POLYGON,
    );
    console.log("Listening to Burn WBNB event on BNB side");
    bnbSideBridge_WBNB.on(
        "Transfer",
        async (from, to, amount, date, nonce, signature, step) => {
            if (step != 0) {
                console.log("Successfully minted");
                return;
            }
            const amountBNB = (amount as BigNumber).toString();
            console.log(
                from,
                "has requested to bridge",
                formatEther((amount as BigNumber).toString()),
                "WBNB from Binance Chain",
            );

            try {
                await polygonSideBridge_WBNB.mint(
                    from,
                    to,
                    amountBNB,
                    nonce,
                    signature,
                );
                console.log(
                    "Minted",
                    formatEther((amount as BigNumber).toString()),
                    "Wrapped BNB to",
                    to,
                    "on Polygon chain",
                );
            } catch (e) {
                console.log("Error in minting", e);
            }
        },
    );

    console.log("Listening to Burn WMATIC event on BNB side");
    bnbSideBridge_WMATIC.on(
        "Transfer",
        async (from, to, amount, date, nonce, signature, step) => {
            if (step != 0) {
                console.log("Successfully minted");
                return;
            }
            const amountWMATIC = (amount as BigNumber).toString();
            console.log(
                from,
                "has requested to bridge",
                formatEther((amount as BigNumber).toString()),
                "WMATIC from Binance Chain",
            );

            try {
                await polygonSideBridge_WMATIC.mint(
                    from,
                    to,
                    amountWMATIC,
                    nonce,
                    signature,
                );
                console.log(
                    "Minted",
                    formatEther((amount as BigNumber).toString()),
                    "Wrapped WMATIC to",
                    to,
                    "on Polygon chain",
                );
            } catch (e) {
                console.log("Error in minting", e);
            }
        },
    );

    console.log("Listening to Burn WBNB event on Polygon side");
    polygonSideBridge_WBNB.on(
        "Transfer",
        async (from, to, amount, date, nonce, signature, step) => {
            if (step != 0) {
                console.log("Successfully minted");
                return;
            }
            const amountBNB = (amount as BigNumber).toString();
            console.log(
                from,
                "has requested to bridge",
                formatEther((amount as BigNumber).toString()),
                "WBNB from Polygon chain",
            );

            try {
                await bnbSideBridge_WBNB.mint(
                    from,
                    to,
                    amountBNB,
                    nonce,
                    signature,
                );
                console.log(
                    "Minted",
                    formatEther((amount as BigNumber).toString()),
                    "Wrapped BNB to",
                    to,
                    "on Binance chain",
                );
            } catch (e) {
                console.log("Error in minting", e);
            }
        },
    );

    console.log("Listening to Burn WMATIC event on Polygon side");
    polygonSideBridge_WMATIC.on(
        "Transfer",
        async (from, to, amount, date, nonce, signature, step) => {
            if (step != 0) {
                console.log("Successfully minted");
                return;
            }
            const amountWMATIC = (amount as BigNumber).toString();
            console.log(
                from,
                "has requested to bridge",
                formatEther((amount as BigNumber).toString()),
                "WMATIC from Polygon chain",
            );

            try {
                await bnbSideBridge_WMATIC.mint(
                    from,
                    to,
                    amountWMATIC,
                    nonce,
                    signature,
                );
                console.log(
                    "Minted",
                    formatEther((amount as BigNumber).toString()),
                    "Wrapped WMATIC to",
                    to,
                    "on Binance chain",
                );
            } catch (e) {
                console.log("Error in minting", e);
            }
        },
    );
}

main();
