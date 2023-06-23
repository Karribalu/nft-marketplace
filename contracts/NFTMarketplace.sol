//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract  NFTMarketplace is ERC721URIStorage{
    address payable owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _tokensSold;

    uint256 public listPrice = 0.01 ether;
    constructor() ERC721("NFTMarketplace", "NFTM") {
        owner = payable(msg.sender);
    }

    struct ListedToken{
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyForSale;
    }
    mapping (uint256 => ListedToken) idToListedToken;
    function updateListPrice(uint256 _newPrice) public {
        require(msg.sender == owner, "Only owner can update list price");
        listPrice = _newPrice;
    }

    function getListPrice() public view returns(uint256){
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns(ListedToken memory){
        return idToListedToken[_tokenIds.current()];
    }
    function getListedForTokenId(uint256 _tokenId) public view returns(ListedToken memory){
        return idToListedToken[_tokenId];
    }

    function getCurrentToken() public view returns(uint256){
        return _tokenIds.current();
    }

    function createToken(string memory _tokenURI, uint256 price) public payable returns(uint256){
        require(msg.value == listPrice, "Must send the list price to create a token");
        require(price > 0, "Price must be greater than 0");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        createListedToken(newItemId, price);
        return newItemId;
    }

    function createListedToken(uint256 _tokenId, uint256 _price) private {
        idToListedToken[_tokenId] = ListedToken(
            _tokenId, 
            payable(msg.sender), 
            payable(address(0)), 
            _price, 
            true);
        _transfer(msg.sender, address(this), _tokenId);
    }
    function getAllNFTs() public view returns(ListedToken[] memory){
        ListedToken[] memory listedTokens = new ListedToken[](_tokenIds.current());
        for(uint256 i = 0; i < _tokenIds.current(); i++){
            listedTokens[i] = idToListedToken[i + 1];
        } 
        return listedTokens;
    }
    function getMyNFTs() public view returns(ListedToken[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        for(uint i = 0; i < totalItemCount; i++){
            if(idToListedToken[i + 1].owner == msg.sender || idToListedToken[i + 1].seller == msg.sender){
                itemCount++;
            }
        }
        ListedToken[] memory myTokens = new ListedToken[](itemCount);
        uint currentIndex = 0;
        for(uint i = 0; i < totalItemCount; i++){
            if(idToListedToken[i + 1].owner == msg.sender || idToListedToken[i + 1].seller == msg.sender){
                myTokens[currentIndex] = idToListedToken[i + 1];
                currentIndex++;
            }
        }
        return myTokens;
    }

    function executeSale(uint256 tokenId) public payable{
        uint price = idToListedToken[tokenId].price;
        require(msg.value == price, "Must send the price of the token to execute sale");
        require(idToListedToken[tokenId].currentlyForSale, "Token is not for sale");
        idToListedToken[tokenId].currentlyForSale = true;
        idToListedToken[tokenId].seller = payable(msg.sender);
        _tokensSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listPrice);
        payable(idToListedToken[tokenId].seller).transfer(msg.value);

    }
}