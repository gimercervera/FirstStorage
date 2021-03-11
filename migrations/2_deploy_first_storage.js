const FirstStorage = artifacts.require("FirstStorage");

module.exports = function (deployer) {
  deployer.deploy(FirstStorage);
};
