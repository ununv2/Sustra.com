'use client'
import Charms from "../components/charms"
import Sidebar from "../components/sidenav"
import MNavbar from "../components/mnavbar";
import { auth } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X } from "lucide-react"
import data from '@/app/data/charm.json'

export default function MarketPlace() {
    const [log, setLogin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('Login');
    const [email, setEmail] = useState<string>('');
    const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName || 'Login');
                setLogin(true);
                setEmail(user.email || '');
            }
            else { router.push('/login') }
        })
    }, [router])

    const onClick = () => {
        router.push('/profile')
    }

    // Handle mobile sidebar animations
    useEffect(() => {
        if (showMobileSidebar) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [showMobileSidebar]);

    const toggleMobileSidebar = (): void => {
        setShowMobileSidebar(!showMobileSidebar);
    };

    return (
        log ? (<div className='grid grid-cols-5 gap-1 max-w-full overflow-x-hidden'>
            <div className="col-span-5">
                <MNavbar user={username} email={email} onClick={onClick} login={log} lp={false} />
            </div>
            <div className="row-span-4 row-start-2 hidden sm:block">
                <Sidebar />
            </div>
            <div className="col-span-5 row-span-4 md:row-start-2 md:col-span-4 lg:col-span-4 lg:pr-20">
                <main className="h-screen bg-white flex-1 p-4">
                    <h1 className="text-black hidden md:block font-semibold text-xl md:text-2xl">Recommended Charms</h1>
                    <h1 className="text-black block md:hidden lg:hidden text-xl"><span className="font-normal">Hello {username},</span> <span className="font-bold">What charms do you wish for today?</span></h1>
                    <br></br>
                    <div className="flex md:hidden lg:hidden justify-between items-center gap-4">
                        <div className="relative w-4/5">
                            <input
                                type="text"
                                placeholder="Search charms..."
                                className="w-full px-3 py-2 pl-10 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.83152 7.83154C7.90117 7.76181 7.98389 7.70649 8.07494 7.66874C8.16599 7.631 8.26358 7.61157 8.36214 7.61157C8.46071 7.61157 8.5583 7.631 8.64935 7.66874C8.7404 7.70649 8.82312 7.76181 8.89277 7.83154L11.7803 10.719C11.921 10.8597 12.0001 11.0504 12.0002 11.2494C12.0002 11.4484 11.9213 11.6392 11.7806 11.7799C11.64 11.9206 11.4492 11.9997 11.2503 11.9998C11.0513 11.9999 10.8605 11.9209 10.7198 11.7803L7.83227 8.89279C7.76254 8.82313 7.70722 8.74042 7.66948 8.64937C7.63173 8.55832 7.6123 8.46072 7.6123 8.36216C7.6123 8.2636 7.63173 8.16601 7.66948 8.07496C7.70722 7.98391 7.76254 7.90119 7.83227 7.83154H7.83152Z" fill="#86869E" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.875 9C5.4167 9 5.9531 8.8933 6.45357 8.686C6.95404 8.4787 7.40877 8.17486 7.79182 7.79182C8.17486 7.40877 8.4787 6.95404 8.686 6.45357C8.8933 5.9531 9 5.4167 9 4.875C9 4.3333 8.8933 3.7969 8.686 3.29643C8.4787 2.79596 8.17486 2.34123 7.79182 1.95818C7.40877 1.57514 6.95404 1.2713 6.45357 1.064C5.9531 0.856696 5.4167 0.75 4.875 0.75C3.78098 0.75 2.73177 1.1846 1.95818 1.95818C1.1846 2.73177 0.75 3.78098 0.75 4.875C0.75 5.96902 1.1846 7.01823 1.95818 7.79182C2.73177 8.5654 3.78098 9 4.875 9ZM9.75 4.875C9.75 6.16793 9.23639 7.40791 8.32215 8.32215C7.40791 9.23639 6.16793 9.75 4.875 9.75C3.58207 9.75 2.34209 9.23639 1.42785 8.32215C0.513615 7.40791 0 6.16793 0 4.875C0 3.58207 0.513615 2.34209 1.42785 1.42785C2.34209 0.513615 3.58207 0 4.875 0C6.16793 0 7.40791 0.513615 8.32215 1.42785C9.23639 2.34209 9.75 3.58207 9.75 4.875Z" fill="#86869E" />
                            </svg>
                        </div>
                        <div className="w-1/5 flex justify-center">
                            <svg 
                                className="w-6 h-6 text-indigo-900 cursor-pointer" 
                                viewBox="0 0 19 12" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={toggleMobileSidebar}
                            >
                                <line x1="5.94116" y1="2.52942" x2="16.647" y2="2.52942" stroke="#070648" strokeWidth="2" strokeLinecap="round" />
                                <line x1="12.4117" y1="9.47058" x2="1.70586" y2="9.47058" stroke="#070648" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="2.82353" cy="2.82353" r="2.32353" stroke="#070648" />
                                <circle cx="15.5294" cy="9.17647" r="2.32353" transform="rotate(-180 15.5294 9.17647)" stroke="#070648" />
                            </svg>
                        </div>
                    </div>
                    <br className="block md:hidden lg:hidden"></br>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-4 lg:gap-4">
                        {data.charms.map((charm) => (
                            <div key={charm.id}>
                                <Charms
                                    id={charm.id}
                                    name={charm.name}
                                    image={charm.image}
                                    variant={charm.variant}
                                    quote={charm.quote}
                                    isRare={charm.isRare}
                                    category={charm.category}
                                />
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showMobileSidebar && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    <div 
                        className="absolute inset-0 bg-black/30"
                        onClick={toggleMobileSidebar}
                    />
                    <div 
                        className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-xs bg-white shadow-lg p-4 transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-purple-800">Filters</h2>
                            <button 
                                onClick={toggleMobileSidebar}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            )}
        </div>) : null
    )
}