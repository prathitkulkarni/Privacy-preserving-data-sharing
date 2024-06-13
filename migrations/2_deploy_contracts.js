const DIDManager = artifacts.require("DIDManager");

module.exports = function(deployer) {
  deployer.deploy(DIDManager);
};
