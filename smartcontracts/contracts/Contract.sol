// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity >=0.8.2 <0.9.0;

contract Authentywatch is ERC721{
    address[] internal admins;
    uint256 public ids = 1;
    uint totalValidationsCount = 3;

    enum TxType {
        MINT,
        BURN,
        UPDATEURI
    }

    struct Transaction {
        uint256 tokenId;
        string URI;
        address[] validations;
    }

    mapping(uint256 => string) internal URIs;
    mapping(TxType => Transaction) internal transactions;

	event NewNFTMinted(address indexed from, uint256 itemId);
    event NewNFTBurned(address indexed from, uint256 itemId);

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

    function hasAlreadyValidated(address _account, TxType _txType) internal view returns(bool){
        bool alreadyValidated = false;
        for(uint i = 0; i < transactions[TxType(_txType)].validations.length; i++){
            if(transactions[TxType(_txType)].validations[i] == _account){
                alreadyValidated = true;
            }
        }
        return alreadyValidated;
    }

    function mint(string memory _URI) external onlyAdmins{
        require(!hasAlreadyValidated(msg.sender, TxType.MINT), "Already signed");
        uint validationsCount = transactions[TxType.MINT].validations.length + 1;
        if(validationsCount == 1){
            transactions[TxType.MINT].URI = _URI;
            transactions[TxType.MINT].validations.push(msg.sender);
        }else{
            if(validationsCount == totalValidationsCount){
                _mint(address(this), ids);
                URIs[ids] = transactions[TxType.MINT].URI;
                ids++;
                transactions[TxType.MINT].URI = "";
                delete transactions[TxType.MINT].validations;
                emit NewNFTMinted(address(this), ids);
            }else{
                transactions[TxType.MINT].validations.push(msg.sender);
            }
        }
    }

    function burn(uint256 _tokenId) external onlyAdmins{
        require(!hasAlreadyValidated(msg.sender, TxType.BURN), "Already signed");
        uint validationsCount = transactions[TxType.BURN].validations.length + 1;
        if(validationsCount == 1){
            transactions[TxType.BURN].tokenId = _tokenId;
            transactions[TxType.BURN].validations.push(msg.sender);
        }else{
            if(validationsCount == totalValidationsCount){
                uint256 tokenId = transactions[TxType.BURN].tokenId;
                _burn(tokenId);
                delete URIs[tokenId];
                transactions[TxType.BURN].tokenId = 0;
                delete transactions[TxType.BURN].validations;
            }else{
                transactions[TxType.BURN].validations.push(msg.sender);
            }
        }
    }

    function updateURI(string memory _newURI, uint256 _tokenId) external onlyAdmins{
        require(!hasAlreadyValidated(msg.sender, TxType.UPDATEURI), "Already signed");
        uint validationsCount = transactions[TxType.UPDATEURI].validations.length + 1;
        if(validationsCount == 1){
            transactions[TxType.UPDATEURI].tokenId = _tokenId;
            transactions[TxType.UPDATEURI].URI = _newURI;
            transactions[TxType.UPDATEURI].validations.push(msg.sender);
        }else{
            if(validationsCount == totalValidationsCount){
                URIs[transactions[TxType.UPDATEURI].tokenId] = transactions[TxType.UPDATEURI].URI;
                transactions[TxType.UPDATEURI].tokenId = 0;
                transactions[TxType.UPDATEURI].URI = "";
                delete transactions[TxType.UPDATEURI].validations;
            }else{
                transactions[TxType.UPDATEURI].validations.push(msg.sender);
            }
        }
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
        require(admins.length > 1, "Cannot remove the last admin");
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == _admin) {
                admins[i] = admins[admins.length - 1];
                admins.pop();
                return;
            }
        }
    }

    function getAdmins() external view onlyAdmins returns(address[] memory){
        return admins;
    }

    function getTxState(TxType _txType) external view onlyAdmins returns(Transaction memory){
        return transactions[_txType];
    }

}