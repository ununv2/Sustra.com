import { FormEvent } from 'react';

interface LoginFormProps {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    text: string;
    error: string;
}

export default function LoginForm({ email, password, setEmail, setPassword, onSubmit, text, error=''}: LoginFormProps) {
    return (
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='font-semibold font-poppins text-center'>{text}</h1>
                <form onSubmit={onSubmit}>
                    {error.length > 2 && (
                        <div className='mb-4 text-red-500'>
                            {error}
                        </div>
                    )}
                    <div className='mb-4'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
                        <input
                            placeholder='name@sustra.com'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your password</label>
                        <input
                            placeholder='••••••••'
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                    <button type='submit' className='w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4'>
                        {text}
                    </button>
                </form>
            </div>
        </div>
    );
}