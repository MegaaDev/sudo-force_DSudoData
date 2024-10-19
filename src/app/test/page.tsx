"use client"
import { useEffect, useState } from 'react';
import { connectWallet, getActiveAccount } from '../components/tezos'; // Ensure correct import path

export default function Home() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        const checkWalletConnection = async () => {
            try {
                const account = await getActiveAccount();
                if (account) {
                    setWalletAddress(account.address);
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error);
            }
        };

        checkWalletConnection();
    }, []);

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
            const account = await getActiveAccount();
            if (account) {
                setWalletAddress(account.address);
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert(error.message);
        }
    };

    const callContract = async () => {
        if (!walletAddress) {
            alert('Please connect your wallet first');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/callContract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress }),
            });

            const data = await res.json();

            if (res.status === 200) {
                setMessage(`Success! Operation hash: ${data.hash}`);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Tezos Contract Interaction</h1>
            {walletAddress ? (
                <button onClick={callContract} disabled={loading}>
                    {loading ? 'Calling contract...' : 'Call Contract'}
                </button>
            ) : (
                <button onClick={handleConnectWallet}>
                    Connect Wallet
                </button>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}
