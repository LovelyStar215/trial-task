"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styles from './login.module.css';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const callbackUrl = "/";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormValues({ email: "", password: "" });

        const res = await signIn("credentials", {
            redirect: false,
            email: formValues.email,
            password: formValues.password,
            callbackUrl,
        });

        setLoading(false);
        console.log(res);
        if (!res?.error) {
            router.push(callbackUrl);
        } else {
            setError("Invalid email or password");
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className="relative h-[100vh] grid items-center justify-center">
            <img src="/img/login-bg.png" alt="image" className="absolute w-full h-full object-cover object-center blur-md" />

            <form onSubmit={onSubmit} className={styles.login__form}>
                <h1 className="text-center text-[2rem] mb-[1.25rem] font-bold">Login</h1>

                <div className="grid gap-y-[1.25rem] mt-7">
                    {error && (
                        <p className="text-center bg-red-300 py-2 rounded">{error}</p>
                    )}
                    <div>
                        <Input name="email" onChange={handleChange} value={formValues.email} type="email" placeholder="Email ID" required />
                    </div>

                    <div>
                        <Input type="password" onChange={handleChange} value={formValues.password} name="password" placeholder="Password" required/>
                        <i className="ri-lock-2-fill"></i>
                    </div>
                </div>
                <Button disabled={loading} type="submit" variant="outline" className="text-black w-full mt-8">{loading ? "Loading..." : "Sign In"}</Button>
                <div className={styles.login__register}>
                    Don't have an account? <a href="/register">Register</a>
                </div>
            </form>
        </div>
    );
};
