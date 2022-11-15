const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //construttore => usato per instanziare ogetti di tipo Web3
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let lottery;


beforeEach(async () => { //azioni preliminari per ogni it (test)
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of this account to Deploy the contract
    lottery = await new web3.eth.Contract(abi)
    .deploy({ 
        data: evm.bytecode.object
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    });
});

/* describe('Inbox', () => {
    it('deploy a contract', () => {
        // console.log(inbox);
        assert.ok(inbox.options.address); //verifico se esiste il valore per il campo address (deply contratto eseguito correttamente)
    });

    it('ok create init message', async () => {
        const message = await inbox.methods.message().call(); //.call(), chiamo una funzione del contratto senza transazione e senza cambiare lo stato del contratto
        console.log(message);
        assert.equal(message, INITIAL_STRING);
    });

    it('ok setMessage', async () => {
        await inbox.methods.setMessage('Messaggio modificato').send({ from: accounts[0] }); //.send() perchè è una transazione, eseguo una modifica e manda una transazione che ha un gasPrice.

        const message = await inbox.methods.message().call();
        console.log(message);
        assert.notEqual(message, INITIAL_STRING);
    });
}) */