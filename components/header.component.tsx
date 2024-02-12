"use client";

import { signOut, useSession } from "next-auth/react";
import { ChangeEvent, useState, useEffect, useCallback } from "react";
import Link from "next/link";

export interface AccountType {
    address?: string;
    balance?: string;
    chainId?: string;
    network?: string;
}

declare let window: any;

const Header = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        async function checkConnection() {
            // Check if MetaMask is installed and connected
            if (typeof window.ethereum !== "undefined") {
                if (window.ethereum && window.ethereum.isConnected()) {
                    setConnected(true);
                    getWalletAddress();
                } else {
                    setConnected(false);
                }
            } else {
                setConnected(false);
            }
        }
        checkConnection();

        if (typeof window.ethereum !== "undefined") {
            // // Add event listener to detect changes in connection status
            window.ethereum.on('accountsChanged', () => {
                checkConnection();
            });

            return () => {
                window.ethereum.removeAllListeners('accountsChanged');
            };
        }
    }, []);

    const getWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setWalletAddress(address);
    }

    const _connectToMetaMask = useCallback(async () => {
        const ethereum = window.ethereum;
        // Check if MetaMask is installed
        if (typeof ethereum !== "undefined") {
            try {
                // Request access to the user's MetaMask accounts
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                // Get the connected Ethereum address
                const address = accounts[0];
                // Check address in console of web browser
                console.log("connected to MetaMask with address: ", address);
            } catch (error: Error | any) {
                alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
            }
        } else {
            alert("MetaMask not installed");
        }
    }, []);
    const metamaskButton = (
        <div className="flex justify-center items-center px-3 py-2 mb-0 border-2 border-solid border-pink-400 rounded-xl cursor-pointer">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" viewBox="0 0 212 189" id="metamask"><g fill="none" fillRule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"></polygon><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"></polygon><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"></polygon><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"></polygon><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"></polygon><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path></g></g></svg>
                <button className="bg-none text-black border-none cursor-pointer text-md ml-4"
                    onClick={_connectToMetaMask}
                >
                    Connect with Metamask
                </button>
            </div>
        </div>
    );
    return (
        <header className="h-20 absolute w-full top-0 bg-transparent flex justify-center items-center">
            <nav className="h-full flex justify-between container items-center w-full">
                <div className="flex items-center">
                    <Link href="/" className="text-ct-dark-600 text-4xl font-semibold mr-11 text-pink-600">
                        Trial Project
                    </Link>
                    {
                        user && (
                            connected ? (
                                <span><span className="font-bold">Address:</span>{walletAddress}</span>
                            ) : metamaskButton
                        )
                    }
                </div>
                <ul className="flex gap-4">
                    <li>
                        <Link href="/" className="text-ct-dark-600">
                            <span className="link link-underline link-underline-black pb-2 px-2 text-white"> Home </span>
                        </Link>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <Link href="/login" className="text-ct-dark-600">
                                    <span className="link link-underline link-underline-black pb-2 px-2 text-white"> Login </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-ct-dark-600">
                                    <span className="link link-underline link-underline-black pb-2 px-2 text-white"> Register </span>
                                </Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <Link href="/profile" className="text-ct-dark-600">
                                    <span className="link link-underline link-underline-black pb-2 px-2 text-white"> Profile </span>
                                </Link>
                            </li>
                            <li className="cursor-pointer" onClick={() => signOut()}>
                                <span className="link link-underline link-underline-black pb-2 px-2 text-white"> Logout </span>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
