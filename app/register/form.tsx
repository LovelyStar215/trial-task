"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState, useEffect, useCallback } from "react";
import styles from './register.module.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export interface AccountType {
    address?: string;
    balance?: string;
    chainId?: string;
    network?: string;
}

declare let window: any;

export const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        address: "",
        wallet_address: ""
    });
    const [error, setError] = useState("");

    // Connect with Metamask
    const [accountData, setAccountData] = useState<AccountType>({});
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
                setFormValues({ ...formValues, wallet_address: address });
            } catch (error: Error | any) {
                alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
            }
        } else {
            alert("MetaMask not installed");
        }
    }, []);
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormValues({ email: "", password: "", confirmpassword: "", address: "", wallet_address: "" });
        if (formValues.password != formValues.confirmpassword) {
            setError("Incorrect Password");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/" });
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const metamaskButton = (
        <div className="flex justify-center items-center p-1 mb-0 border-2 border-solid border-pink-400 rounded-lg cursor-pointer">
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 212 189" id="metamask"><g fill="none" fillRule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"></polygon><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"></polygon><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"></polygon><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"></polygon><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"></polygon><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path></g></g></svg>
                <Button onClick={_connectToMetaMask}>Connect with Metamask</Button>
            </div>
        </div>
    );
    return (
        <div className={styles.login}>
            <img src="/img/login-bg.png" alt="image" className={styles.login__bg} />

            <form onSubmit={onSubmit} className={styles.login__form}>
            <h1 className="text-center text-[2rem] mb-[1.25rem] font-bold">Register</h1>
                {error && (
                    <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                )}
                <div className={styles.login__inputs}>
                    {metamaskButton}
                    <div>
                        <Input name="wallet_address" value={formValues.wallet_address} type="text" placeholder="Wallet Address" required readOnly />
                        <i className="ri-lock-2-fill"></i>
                    </div>
                    <div>
                        <Input type="email" name="email" onChange={handleChange} value={formValues.email} placeholder="Email ID" required />
                        <i className="ri-mail-fill"></i>
                    </div>

                    <div>
                        <Input type="password" placeholder="Password" onChange={handleChange} value={formValues.password} name="password" required />
                        <i className="ri-lock-2-fill"></i>
                    </div>
                    <div>
                        <Input type="password" placeholder="Confirm Password" onChange={handleChange} value={formValues.confirmpassword} name="confirmpassword" required />
                        <i className="ri-lock-2-fill"></i>
                    </div>
                    <div>
                        <Input type="text" name="address" onChange={handleChange} value={formValues.address} placeholder="Address" />
                        <i className="ri-mail-fill"></i>
                    </div>
                </div>
                <Button disabled={loading} type="submit" className="bg-black w-full mt-4">{loading ? "Loading..." : "Sign Up"}</Button>

                <div className={styles.login__register}>
                    Do you have an account? <a href="/login">Login</a>
                </div>
            </form>
        </div>
    );
};
