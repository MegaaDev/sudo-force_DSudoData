// import { getTezosInstance, connectWallet, getActiveAccount } from './../components/tezos';

// export default async function handler(req, res) {
//     try {
//         // Ensure the user has connected their wallet
//         await connectWallet();
//         const activeAccount = await getActiveAccount();

//         if (!activeAccount) {
//             return res.status(401).json({ message: 'Wallet not connected' });
//         }

//         const Tezos = getTezosInstance();

//         // Replace with your deployed contract address
//         const contractAddress = 'KT1LG2imHhuR48DgVhXEWXWQwppjAxqpEHoj';

//         // Fetch the contract
//         const contract = await Tezos.contract.at(contractAddress);

//         // Call the contract's entry point
//         const operation = await contract.methods.hello_world().send();

//         // Wait for confirmation
//         await operation.confirmation();

//         res.status(200).json({ message: 'Contract called successfully', hash: operation.hash });
//     } catch (error) {
//         console.error('Error calling contract:', error);
//         if (error instanceof Error) {
//             res.status(500).json({ error: error.message });
//         } else {
//             res.status(500).json({ error: 'An unknown error occurred' });
//         }
//     }
// }
