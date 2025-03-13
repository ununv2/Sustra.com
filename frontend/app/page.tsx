'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/app/firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Home() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLogin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen">
      <div className='items-center justify-items'>
        <p>Sustra.com</p>
        {login ? (
          <button onClick={handleSignOut} className="text-red-500">Sign Out</button>
        ) : (
          <>
            <Link href='/signup'>Sign Up</Link>
            <br />
            <Link href='/login'>Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
