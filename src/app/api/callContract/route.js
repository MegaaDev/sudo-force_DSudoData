// app/api/callContract/route.js
import { NextResponse } from 'next/server';
import { getTezosInstance } from './../../components/tezos';

export async function POST(req) {
    const { walletAddress } = await req.json(); // Expect wallet address from the request body

    if (!walletAddress) {
        return NextResponse.json({ message: 'Wallet address not provided' }, { status: 400 });
    }

    try {
        const Tezos = getTezosInstance();

        // Replace with your deployed contract address
        const contractAddress = 'KT1LG2imHhuR48DgVhXEWXWQwppjAxqpEHoj';

        // Fetch the contract
        const contract = await Tezos.contract.at(contractAddress);

        // Call the contract's entry point
        const operation = await contract.methods.hello_world().send();

        // Wait for confirmation
        await operation.confirmation();

        return NextResponse.json({ message: 'Contract called successfully', hash: operation.hash });
    } catch (error) {
        console.error('Error calling contract:', error);
        return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
    }
}
