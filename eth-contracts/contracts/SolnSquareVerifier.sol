pragma solidity 0.5.2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";
import "./ERC721Mintable.sol";


contract SolnSquareVerifier is DecentralizedHousingToken {
    Verifier verifierContract;
    struct Solution {
        uint index;
        address solvedBy;
    }

    Solution[] private solutions;
    mapping(bytes32 => Solution) private uniqueSolutions;

    event SolutionAdded(uint index, address solvedBy);

    constructor(address verifierContractAddress) public {
        verifierContract = Verifier(verifierContractAddress);
    }

    function hash
    (
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    )
    public pure returns(bytes32)
    {
        return keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
    }

    // function to add the solutions to the array and emit the event
    function addSolution(uint index, address solvedBy, bytes32 solutionHash) public
    {
        Solution memory solution = Solution(index, solvedBy);
        solutions.push(solution);
        uniqueSolutions[solutionHash] = solution;

        emit SolutionAdded(index, solvedBy);
    }

    // function to mint new NFT only after the solution has been verified
    function mintNewToken
    (
        address to,
        uint tokenId,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    )
    public
    returns (bool)
    {
        bytes32 solutionHash = hash(a, a_p, b, b_p, c, c_p, h, k, input);
        bool verified = verifierContract.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);
        require(verified, "Solution not verified (zero Knowledge Proof check)");
        require(
            uniqueSolutions[solutionHash].solvedBy == address(0),
            "Solution has already been used before"
        );
        addSolution(tokenId, to, solutionHash);
        return mint(to, tokenId);
    }
}
