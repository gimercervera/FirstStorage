import Web3 from 'web3';
import FirstStorage from '../build/contracts/FirstStorage.json';

let web3;
let firstStorage;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        //Caso 1. Exista una nueva versión de Metamask.
        if(typeof window.ethereum !== 'undefined') {
            window.ethereum.enable()
            .then(() => {
                resolve(
                    new Web3(window.ethereum)
                );
            })
            .catch(e => {
                reject(e);
            });
            return;
        }
        //Caso 2. Exista una versión antigua de Metamask.
        if(typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        //Caso 3. Que no esté presente Metamask.
        resolve(new Web3('http://localhost:9545'));
    });
};

const initContract = () => {
    return new web3.eth.Contract(
        FirstStorage.abi,
        FirstStorage
            .networks[5777]
            .address
    )
};

const initApp = () => {
    const $setValue = document.getElementById('setValue');
    const $value = document.getElementById('value');

    let accounts = [];

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
            return firstStorage.methods
                .getValue()
                .call();
        })
        .then(result => {
            $value.innerHTML = result;
        });

    $setValue.addEventListener('submit', e => {
        e.preventDefault();
        const value = e.target.elements[0].value;
        firstStorage.methods
            .setValue(value)
            .send({from: accounts[0]})
            .then(() => {
                return firstStorage.methods
                    .getValue()
                    .call();
            })
            .then(result => {
                $value.innerHTML = result;
            });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            firstStorage = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
});