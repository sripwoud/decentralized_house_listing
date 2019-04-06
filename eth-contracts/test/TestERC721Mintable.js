const ERC721MintableComplete = artifacts.require('DecentralizedHousingToken')
const truffleAssert = require('truffle-assertions')

contract('TestERC721Mintable', accounts => {
  describe('Match ERC721 specifications', function () {
    beforeEach(async function () {
      this.contract = await ERC721MintableComplete.new({ from: accounts[0] })
      // Mint multiple tokens
      const tx = await this.contract.mint(accounts[1], 0)
      await this.contract.mint(accounts[1], 1)
      await this.contract.mint(accounts[1], 2)
      await this.contract.mint(accounts[2], 3)
      truffleAssert.eventEmitted(tx, 'Transfer', ev => {
        return ev.from === accounts[0] &
        ev.to === accounts[1] &
        +ev.tokenId === 0
      })
    })

    it('Can return total supply', async function () {
      const totalSupply = await this.contract.totalSupply()
      assert.equal(totalSupply, 4, 'Wrong total supply value')
    })

    it('Can get token balance', async function () {
      const balance = await this.contract.balanceOf(accounts[1])
      assert.equal(balance, 3, 'Wrong token balance value')
    })

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('Can return token URI', async function () {
      const uri = await this.contract.tokenURI(1)
      assert.equal(
        uri,
        'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1',
      'Wrong token uri')
    })

    it('Can transfer token from one owner to another', async function () {
      const tx = await this.contract.transferFrom(
        accounts[1],
        accounts[2],
        0,
        { from: accounts[1] }
      )

      assert.equal(
        await this.contract.ownerOf(0),
        accounts[2],
        'Wrong new owner. Token was not transferred correctly'
      )

      truffleAssert.eventEmitted(tx, 'Transfer', ev => {
        return ev.from === accounts[1] &
        ev.to === accounts[2] &
        +ev.tokenId === 0
      })
    })
  })

  describe('Have ownership properties', function () {
    beforeEach(async function () {
      this.contract = await ERC721MintableComplete.new({ from: accounts[0] })
    })

    it('should fail when minting when address is not contract owner', async function () {
      try {
        await this.contract.mint(accounts[1], 1, { from: accounts[1] })
      } catch (error) {
        assert(error.message.includes('Only owner'), 'Wrong revert message')
      }
    })

    it('should return contract owner', async function () {
      assert.equal(
        await this.contract.owner(),
        accounts[0],
        'Wrong contract owner address'
      )
    })
  })
})
