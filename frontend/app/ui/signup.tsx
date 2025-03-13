'use client'
import { useState } from 'react';
import { auth } from '@/app/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import LoginForm from './components/loginform';
import { useRouter } from 'next/navigation'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error,setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if(password.length>7&&email!==''){
            createUserWithEmailAndPassword(auth,email, password).then( authUser=>{
                console.log('Success. User is created.')
                router.push('/logged_in')
            } ).catch(error =>{
                setError(error.message)
            })
        }
        else{
            setError('Invalid email or password.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center'>
                {/*header container*/}
                <div className='items-center justify-center flex'>
                    <Link href='/' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white font-poppins'>Sustra.com</Link>
                </div>
                {/*form container*/}
                <LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} onSubmit={handleSignup} text='Create your account' error={error}/>
            </div>
        </div>
    )
}