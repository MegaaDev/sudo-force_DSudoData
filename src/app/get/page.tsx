/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Buffer } from "buffer";

export default function DecryptPage() {
    const [hash, setHash] = useState("");
    const [decryptionKey, setDecryptionKey] = useState("");
    const [decryptedFileURL, setDecryptedFileURL] = useState<string | null>(
        null
    );
    const [loading, setLoading] = useState(false);

    const decryptBuffer = async (
        encryptedBuffer: ArrayBuffer,
        iv: Uint8Array,
        keyHex: string
    ) => {
        try {
            // Convert the hex key back into a CryptoKey object
            const keyBuffer = Buffer.from(keyHex, "hex");
            const cryptoKey = await window.crypto.subtle.importKey(
                "raw",
                keyBuffer,
                { name: "AES-GCM" },
                true,
                ["decrypt"]
            );

            // Decrypt the buffer
            const decrypted = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                cryptoKey,
                encryptedBuffer
            );
            return new Uint8Array(decrypted);
        } catch (error) {
            console.error("Error decrypting file:", error);
            alert("Error decrypting file. Please check your key.");
            return null;
        }
    };

    const handleDownloadAndDecrypt = async () => {
        if (!hash || !decryptionKey) {
            alert("Please enter both the IPFS hash and decryption key.");
            return;
        }

        setLoading(true);

        try {
            // Download the encrypted file from IPFS
            const response = await axios.get(`https://ipfs.io/ipfs/${hash}`, {
                responseType: "arraybuffer",
            });

            // Extract IV and encrypted data
            const iv = new Uint8Array(response.data.slice(0, 12)); // First 12 bytes are IV
            const encryptedData = response.data.slice(12); // The rest is the encrypted data

            // Decrypt the file
            const decrypted = await decryptBuffer(
                encryptedData,
                iv,
                decryptionKey
            );
            if (decrypted) {
                // Convert the decrypted file into a Blob and create an object URL
                const blob = new Blob([decrypted], { type: "image/png" }); // You can adjust the MIME type as needed
                const url = URL.createObjectURL(blob);
                setDecryptedFileURL(url); // Set the URL to display the image
            }
        } catch (err) {
            console.error("Error downloading or decrypting file:", err);
            alert(
                "An error occurred. Please check the IPFS hash or decryption key."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen">
            <div className="h-[10%]"></div>
            <div className="h-[90%]">
                <h1>Download and Decrypt File</h1>
                <Form>
                    <Form.Group controlId="ipfsHash">
                        <Form.Label>IPFS Hash</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the IPFS hash"
                            value={hash}
                            onChange={(e) => setHash(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="decryptionKey">
                        <Form.Label>Decryption Key</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the decryption key"
                            value={decryptionKey}
                            onChange={(e) => setDecryptionKey(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleDownloadAndDecrypt}
                        disabled={loading}
                    >
                        {loading ? "Decrypting..." : "Download and Decrypt"}
                    </Button>
                </Form>

                {decryptedFileURL && (
                    <div>
                        <h4>Decryption Successful!</h4>
                        <img src={decryptedFileURL} alt="Decrypted Image" />
                    </div>
                )}
            </div>
        </div>
    );
}
