pragma solidity =0.5.16;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  constructor(address token) public BridgeBase(token) {}
}
