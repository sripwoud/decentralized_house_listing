// migrating the appropriate contracts
// const SquareVerifier = artifacts.require('./SquareVerifier.sol')
// const SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol')
const ERC721Mintable = artifacts.require('DecentralizedHousingToken')

module.exports = function (deployer) {
  deployer.deploy(ERC721Mintable)
  // deployer.deploy(SquareVerifier)
  // deployer.deploy(SolnSquareVerifier)
}
