'use client'

import { useEffect, useState } from 'react';
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

interface portfolioType { name: string; symbol: string; logo?: string | undefined; amount: string; }
declare let window: any;

const CryptoPortfolio: React.FC = () => {
    const [data, setData] = useState<portfolioType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const ethereum = window.ethereum;
            // Check if MetaMask is installed
            if (typeof ethereum !== "undefined") {
                try {
                    // Get wallet address
                    const accounts = await ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const address = accounts[0];
                    console.log("connected to MetaMask with address: ", address);

                    // Get crypto portfolio
                    try {
                        await Moralis.start({
                            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg3MjcwMWI5LTE1NWQtNGFlMy04NmU4LTJhMmJmNjc3OWZkMyIsIm9yZ0lkIjoiMzc3ODc1IiwidXNlcklkIjoiMzg4MzIwIiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJlODkzNWY5YS1mNGNhLTQzOGEtYjI3Ny0xZjVhZGY4NzYwNTEiLCJpYXQiOjE3MDgzMzExODksImV4cCI6NDg2NDA5MTE4OX0.Spdn-A78LaScFCWdaBWFS5rthYSwMflXbkn2WuBi90g",
                        });

                        const chain = EvmChain.ETHEREUM;

                        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
                            address,
                            chain,
                        });
                        console.log(response.toJSON());
                        const resData = response.toJSON();
                        resData.map(token => {
                            const balance = BigInt(token.balance);

                            const calcAmount = balance / BigInt(10 ** token.decimals);
                            const newValue = {
                                name: token.name,
                                symbol: token.symbol,
                                logo: token.logo,
                                amount: calcAmount.toString()
                            }
                            setData(prevData => [...prevData, newValue]);
                        })

                    } catch (error) {
                        console.log(error);
                    }
                } catch (error: Error | any) {
                    alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
                }
            } else {
                alert("MetaMask not installed");
            }

        }

        if (data.length == 0) {
            fetchData();
            console.log("resData", data);
        }
    }, [data]);

    return (
        <div className='h-[254px] overflow-y-scroll'>
            <div className="flex bg-blue-900 text-white border p-1 rounded-t text-xs w-full text-center">
                <div className="flex w-1/3">
                    <span className='w-full'>No</span>
                </div>
                <div className="flex w-full">
                    <span className="w-full ">Coin</span>
                </div>
                <div className='w-full'>Amount</div>
            </div>
            {
                data.length ? data.map((token, index) =>
                    <div className="flex place-items-center p-1 border-b hover:bg-gray-200 text-xs relative text-center">
                        <div className="flex w-1/3">
                            <span className='w-full'>{index + 1}</span>
                        </div>
                        <div className="flex w-full items-center">
                            {
                                token.logo
                                    ? <img
                                        src={token.logo}
                                        alt={token.name}
                                        className="w-3 object-contain"
                                    />
                                    : <svg fill="#000000" height="12px" width="12px" version="1.1" id="Capa_1" viewBox="0 0 29.536 29.536">
                                        <g>
                                            <path d="M14.768,0C6.611,0,0,6.609,0,14.768c0,8.155,6.611,14.767,14.768,14.767s14.768-6.612,14.768-14.767
                 C29.535,6.609,22.924,0,14.768,0z M14.768,27.126c-6.828,0-12.361-5.532-12.361-12.359c0-6.828,5.533-12.362,12.361-12.362
                 c6.826,0,12.359,5.535,12.359,12.362C27.127,21.594,21.594,27.126,14.768,27.126z"/>
                                            <path d="M14.385,19.337c-1.338,0-2.289,0.951-2.289,2.34c0,1.336,0.926,2.339,2.289,2.339c1.414,0,2.314-1.003,2.314-2.339
                 C16.672,20.288,15.771,19.337,14.385,19.337z"/>
                                            <path d="M14.742,6.092c-1.824,0-3.34,0.513-4.293,1.053l0.875,2.804c0.668-0.462,1.697-0.772,2.545-0.772
                 c1.285,0.027,1.879,0.644,1.879,1.543c0,0.85-0.67,1.697-1.494,2.701c-1.156,1.364-1.594,2.701-1.516,4.012l0.025,0.669h3.42
                 v-0.463c-0.025-1.158,0.387-2.162,1.311-3.215c0.979-1.08,2.211-2.366,2.211-4.321C19.705,7.968,18.139,6.092,14.742,6.092z"/>
                                        </g>
                                    </svg>
                            }
                            <span className="uppercase font-semibold text-xs text-left"> {token.name}({token.symbol})</span>
                        </div>
                        <div className='w-full'>{token.amount}</div>
                    </div>
                ) : "Don't have any assets"
            }
        </div>
    );
};

export default CryptoPortfolio;
