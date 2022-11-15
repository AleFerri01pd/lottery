// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender; //msg oggetto, variabile globale. Possibilità di accedere ad informazioni relative ad un transazione (sender, gas, value of wei etc)
    }

    function enter() public payable {
        require(msg.value > .01 ether); //funzione globale, termina la transazione se lo stato della condizione è false
        
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))); //keccak256 è una funzione globale
    }

    modifier restricted() { //molto utile per non ripetere il codice
        require(msg.sender == manager);
        _; //puntatore di riferimento per appendere il codice
    }
}