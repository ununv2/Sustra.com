"use client";
import { useState,useEffect } from "react";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import LoginForm from "./components/loginform";
import { useRouter } from "next/navigation";
import {signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to home page
                router.push('/');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [router]);

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length > 7 && email !== '') {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                router.push('/');
            } catch (error) {
                setError("Failed to sign in. Please check your credentials and try again.");
            }
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                {/*header container*/}
                <div className="items-center justify-center flex">
                    <Link
                        href="/"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white font-poppins"
                    >
                        Sustra.com
                    </Link>
                </div>
                {/*form container*/}
                <LoginForm
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    onSubmit={handleSignin}
                    text="Login"
                    error={error}
                />
            </div>
        </div>
    );
}
