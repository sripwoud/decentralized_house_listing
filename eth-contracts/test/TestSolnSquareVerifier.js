const SolnSquareVerifier = artifacts.require('SolnSquareVerifier')
const Verifier = artifacts.require('Verifier')
const truffleAssert = require('truffle-assertions')

contract('SolnSquareVerifier', accounts => {
  const { proof, input } = require('../../zokrates/code/square/proof.json')

  beforeEach(async () => {
    const verifierContract = await Verifier.new({ from: accounts[0] })
    this.contract = await SolnSquareVerifier.new(
      verifierContract.address,
      { from: accounts[0] }
    )
  })

  // Test if a new solution can be added for contract - SolnSquareVerifier
  it('Can add new solution for contract', async () => {
    const hash = await this.contract.hash.call(
      proof.A,
      proof.A_p,
      proof.B,
      proof.B_p,
      proof.C,
      proof.C_p,
      proof.H,
      proof.K,
      input
    )
    const tx = await this.contract.addSolution(
      1,
      accounts[1],
      hash
    )
    truffleAssert.eventEmitted(
      tx,
      'SolutionAdded',
      ev => {
        return +ev.index == 1 &
        ev.solvedBy === accounts[1]
      },
      'SolutionAdded event should have been emitted'
    )
  })

  // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
  it('Can mint token', async () => {
    const tx = await this.contract.mintNewToken(
      accounts[1],
      2,
      proof.A,
      proof.A_p,
      proof.B,
      proof.B_p,
      proof.C,
      proof.C_p,
      proof.H,
      proof.K,
      input,
      { from: accounts[0] }
    )
    assert(tx, 'No token minted')

    truffleAssert.eventEmitted(
      tx,
      'Transfer',
      ev => {
        return ev.from === accounts[0] &
        ev.to === accounts[1] &
        +ev.tokenId == 2
      },
      'Transfer event should have been emitted'
    )
  })
})
