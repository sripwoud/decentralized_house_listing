# Decentralized Housing Service
## Introduction
### Issue
At present, property titles are often paper-based, creating opportunities for errors and fraud. Title professionals find defects in 25% of all titles during the transaction process, according to the American Land Title Association.  
Any identified defect makes it illegal to transfer a property title to a buyer until it is rectified. This means property owners often incur high legal fees to ensure authenticity and accuracy of their property titles.  
Moreover, title fraud poses a risk to homeowners worldwide. US losses associated with title fraud reportedly averaged around $103,000 per case in 2015, compelling many property buyers to purchase title insurance.
### Solution
These title management issues could potentially be mitigated by using blockchain technology to build immutable digital records of land titles and using blockchain for transparent transactions. This approach could simplify property title management, making it more transparent and helping to reduce the risk of title fraud and the need for additional insurance.
As a solution I developed a **Decentralized Housing Service** featuring:
- Tokens ([ERC721 Standard](http://erc721.org/)) to represent the titles of properties
- Zero Knowledge Proof of property's (token) ownership using the [ZoKrates](https://zokrates.github.io/introduction.html) toolbox for ZkSNARKS on Ethereum
- Listing of properties on [OpenSea marketplace](https://opensea.io/)

## Getting started
1. Clone or download this repository
1. `cd` to project folder
2. Install dependencies
```
$ npm install
$ cd eth-contracts
$ npm install
```
3. Run tests:
```
$ truffle develop
truffle(develop)> test
```

## Zokrates proofs generation (Info)
**Prerequesite**: [Docker](https://docs.docker.com/install/)
At contract migration, 10 initial tokens are minted. For it to succeed, 10
corresponding proofs are required. To automate the generation of 10 proofs, I wrote
the [script.sh](./zokrates/code/square/generateProofs.sh) script. From the
project root directory, execute it as follow:
```
$ cd zokrates/code
$ chmod +x generateProofs.sh
$ docker run -v /path/to/project/root/directory/zokrates/code/:/home/zokrates/code -ti zokrates/zokrates /bin/bash
zokrates@0xxxxxxxxxxxx:~$ cd code/square
zokrates@0xxxxxxxxxxxx:~$ ./generateProofs.sh
```

The proofs.json generated includes then the 10 proofs. It is read during migration to mint the tokens.

## Contract Details
- address: 0x3cba03458005c8425Fc3B93755aA1B93535a85a8
- [EtherScan](https://rinkeby.etherscan.io/address/0x3cba03458005c8425Fc3B93755aA1B93535a85a8)

## OpenSea listing
1. Go to [OpenSea rinkeby](https://rinkeby.opensea.io/)
2. Load your migrated contract: `Develop > Live on Rinkeby`
3. Sell your items! (Multiple metamask transactions will have to be confirmed or signed)

**Token purchases:**
- https://rinkeby.opensea.io/assets/0xa75b004d71398347f1e9af3bc526fef133db4353/5
- https://rinkeby.opensea.io/assets/0xa75b004d71398347f1e9af3bc526fef133db4353/3
- https://rinkeby.opensea.io/assets/0xa75b004d71398347f1e9af3bc526fef133db4353/2
- https://rinkeby.opensea.io/assets/0xa75b004d71398347f1e9af3bc526fef133db4353/1
- https://rinkeby.opensea.io/assets/0xa75b004d71398347f1e9af3bc526fef133db4353/0


## Project Resources
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
* [OpenSea](https://opensea.io/): The largest marketplace for crypto collectibles
