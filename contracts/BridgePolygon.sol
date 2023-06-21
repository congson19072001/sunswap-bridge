pragma solidity =0.5.16;

import './BridgeBase.sol';

contract BridgePolygon is BridgeBase {
  constructor(address token) public BridgeBase(token) {}
}
