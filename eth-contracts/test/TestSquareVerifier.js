const Verifier = artifacts.require('Verifier')

contract('Verifier', accounts => {
  const { proof, input } = require('../../zokrates/code/square/proof.json')
  beforeEach(async () => {
    this.contract = await Verifier.new({ from: accounts[0] })
  })

  // Test verification with correct proof
  it('VerifyTx returns true with correct proof', async () => {
    const result = await this.contract.verifyTx(
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
  assert(result, 'Wrong proof check result')
  })

  // Test verification with incorrect proof
  it('VerifyTx returns false with incorrect proof', async () => {
    // change 1 input value
    const A = ['0x10011bb0ae2830e7aac3a8018a35cb5bcf7e9b7e1f1f978659617bb8963dc9eb', '0x1e1bfa48eea252e9af7a640692efd7a9621196f199449297eb15f0de55f48e2']

    const result = await this.contract.verifyTx.call(
      A,
      proof.A_p,
      proof.B,
      proof.B_p,
      proof.C,
      proof.C_p,
      proof.H,
      proof.K,
      input
    )
    assert(!result, 'Proof check result should be false')
  })
})
