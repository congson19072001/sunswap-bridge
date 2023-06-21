pragma solidity =0.5.16;

interface IToken {
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
}
