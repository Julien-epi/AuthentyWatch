// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity >=0.8.2 <0.9.0;

contract Authentywatch is ERC721{
    address[] internal admins;
    uint256 public ids = 1;

    mapping(uint256 => string) internal URIs;

	event NewNFTMinted(address indexed from, uint256 itemId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        admins.push(msg.sender);
    }

    modifier onlyAdmins(){
        bool admin = false;
        uint size = admins.length;
        for (uint i=0; i < size; i++){
            if(msg.sender == admins[i]){
                admin = true;
            }
        }
        require(admin, "Caller is not admin");
        _;
    }

    function mint(address to, string memory _URI) external onlyAdmins{
        uint256 id = ids;
        _mint(to, id);
        URIs[id] = _URI;
        ids++;
    }

    function updateURI(string memory _newURI, uint256 _tokenId) external onlyAdmins{
        URIs[_tokenId] = _newURI;
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory){
        require(_tokenId < ids, "ID out of range");
        return URIs[_tokenId];
    }

    function getTokens(uint256 _idStart, uint256 _idStop) external view returns(string[] memory){
        require(_idStop < ids, "ID out of range");
        require(_idStart > 0, "ID out of range");
        require(_idStop - _idStart >= 0, "ID out of range");
        uint size = _idStop - _idStart + 1;
        string[] memory tokens = new string[](size);
        uint index = 0;
        for(uint i = _idStart; i <= _idStop ; i++){
            tokens[index] = URIs[i];
        }
        return tokens;
    }

    function getToken(uint256 _tokenId) external view returns(string memory){
        return URIs[_tokenId];
    }

    function isAdmin(address _account) external view returns(bool){
        bool admin = false;
        uint size = admins.length;
        for (uint i=0; i < size; i++){
            if(_account == admins[i]){
                admin = true;
            }
        }
        return admin;
    }

    function addAdmin(address _newAdmin) external onlyAdmins{
        admins.push(_newAdmin);
    }

    function removeAdmin(address _admin) external onlyAdmins{
        for (uint256 i = 0; i < admins.length; i++) {
        if (admins[i] == _admin) {
            admins[i] = admins[admins.length - 1];
            admins.pop();
            return;
        }
    }
    }

}