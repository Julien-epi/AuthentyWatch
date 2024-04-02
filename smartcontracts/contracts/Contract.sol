// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity >=0.8.2 <0.9.0;

contract Authentywatch is ERC721{
    address[] internal admins;
    uint256 public ids;

    mapping(uint256 => string) internal URIs;

	event NewNFTMinted(address indexed from, uint256 itemId);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) { 
        admins[0] = msg.sender;
    }

    modifier onlyAdmins(){
        bool isAdmin = false;
        uint size = admins.length;
        for (uint i=0; i < size; i++){
            if(msg.sender == admins[i]){
                isAdmin = true;
            }
        }
        require(isAdmin, "Caller is not admin");
        _;
    }

    function mint(string memory _URI) external onlyAdmins{
        uint256 id = ids;
        _mint(msg.sender, id); // TODO : VOIR S'IL FAUT CHANGER MSG.SENDER
        URIs[id] = _URI;
        ids++;
    }

    function updateURI(string memory _newURI, uint256 _tokenId) external onlyAdmins{
        URIs[_tokenId] = _newURI;
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory){
        return URIs[_tokenId];
    }

    function getTokens(uint256 _idStart, uint256 _idStop) external view returns(string[] memory){
        require(_idStop < ids, "ID out of range");
        require(_idStart > 0, "ID out of range");
        require(_idStop - _idStart > 0, "ID out of range");
        string[] memory tokens;
        uint index = 0;
        for(uint i = _idStart; i < _idStop ; i++){
            tokens[index] = URIs[i];
        }
        return tokens;
    }

    function getToken(uint256 _tokenId) external view returns(string memory){
        return URIs[_tokenId];
    }

    function getAdmins() external view returns(address[] memory){
        return admins;
    }

    function setAdmin(address _newAdmin) external onlyAdmins{
        admins.push(_newAdmin);
    }

    function removeAdmin(address _admin) external onlyAdmins{
        // TODO
    }

}