const SquareVerifier = artifacts.require('./Verifier.sol')
const SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol')
const fs = require('fs')
const path = require('path')
const proofs = require('../../zokrates/code/square/proofs.json')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SquareVerifier)
    .then(instance => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address)
        .then(instance => {
          // mint tokens
          proofs.forEach((proof, index) => {
            instance.mintNewToken(
              accounts[0],
              index,
              proof.proof.A,
              proof.proof.A_p,
              proof.proof.B,
              proof.proof.B_p,
              proof.proof.C,
              proof.proof.C_p,
              proof.proof.H,
              proof.proof.K,
              proof.input
            )
              // .then(val => {
              //   if (val) {
              //     console.log()
              //     console.log(`token ${index} minted to ${accounts[0]}`)
              //   }
              // })
          })
        })
    })
}
