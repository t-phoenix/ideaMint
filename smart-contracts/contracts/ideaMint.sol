// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMintingContract is ERC721 {
    using SafeMath for uint256;

    address public owner;
    uint256 public mintingFee;
    uint256 public tokenIdCounter;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialMintingFee
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
        mintingFee = _initialMintingFee;
        tokenIdCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setMintingFee(uint256 _newFee) external onlyOwner {
        mintingFee = _newFee;
    }

    function mintNFT() external payable {
        require(msg.value >= mintingFee, "Insufficient fee");
        
        tokenIdCounter++;
        uint256 newTokenId = tokenIdCounter;
        _mint(msg.sender, newTokenId);
        
        // Transfer the minting fee to the contract owner
        payable(owner).transfer(msg.value);
    }
}
