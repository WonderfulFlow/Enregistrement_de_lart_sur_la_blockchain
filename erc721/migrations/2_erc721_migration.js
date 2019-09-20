require('babel-register')
require('babel-polyfill')


const MyERC721 = artifacts.require("./contracts/MyERC721.sol");

module.exports = async function(deployer) {
  await deployer.deploy(MyERC721, "MyERC721", "MyERC721")
  const erc721 = await MyERC721.deployed()
};