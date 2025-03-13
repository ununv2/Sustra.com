'use client'
import {auth} from '@/app/firebase/config'
import {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'

export default function LoggedIn() {

    const [login, setLogin] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const uid = user.uid;
                console.log('uid',uid)
            }
            else{
                console.log('user is logged out.')
            }
        })
    });

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center'>
            {login&&(<h1 className='text-red-500 font-extrabold'> User is logged in.</h1>)}
        </div>
    </div>)
}