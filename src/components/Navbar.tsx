"use client";

import React, { useState } from "react";
import Link from 'next/link'

import { signoutUser } from "@/app/actions";
import useAppStore from "@/lib/useAppStore";

const Navbar: React.FC = () => {
    const user = useAppStore((state) => state.user);
    const setUser = useAppStore(state => state.setUser);

    const [isOpen, setOpen] = useState(false);

    const menuToggle = () => {
        setOpen(!isOpen);
    };

    const signout = () => {
        signoutUser();
        setUser(null);

        window.location.href = '/sign-in';
    }

    return (
        <div className="flex min-h-[4.5rem] w-full items-center text-black border-b z-10 shadow-sm">
            <div className="xl:container xl:px-2 flex w-full px-5 mx-auto items-center justify-between">
                <div>
                    <Link href={'/'}>
                        <img
                            className="h-[3rem]"
                            alt="Olivia Health Plan of Safecare logo"
                            src="/images/logo.svg"
                        />
                    </Link>
                </div>

                <div>
                    <div className="md:hidden selectable group" onClick={menuToggle}>
                        <div className="space-y-2">
                            <span
                                className={`block h-1 w-8 bg-black rounded-full transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                            ></span>
                            <div className="relative">
                                <span
                                    className={`block absolute h-1 w-8 bg-black rounded-full transition-transform duration-200 ease-in-out origin-center ${isOpen ? 'rotate-45' : ''}`}
                                ></span>
                                <span
                                    className={`block h-1 w-8 bg-black transition-transform duration-200 ease-in-out rounded-full origin-center ${isOpen ? '-rotate-45' : ''}`}
                                ></span>
                            </div>
                            <span
                                className={`block h-1 w-8 bg-black rounded-full transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                            ></span>
                        </div>
                    </div>
                    <div
                        className={`${isOpen ? 'block bg-white border shadow mt-4 mr-1' : 'hidden'} absolute rounded-xl md:shadow-none md:bg-none md:border-0 md:relative right-0 md:mt-0 p-4 md:p-0 md:flex space-y-6 md:space-y-0 md:space-x-4 text-sm md:text-base`}
                    >
                        {user && (<Link href={'/dashboard'} className="block md:flex button">
                            Dashboard
                        </Link>)}

                        {user ? (
                            <button
                                className="block md:flex button md:button-filled md:rounded-full gap-x-2"
                                onClick={signout}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href={'/sign-in'}
                                className="block md:flex button md:button-filled md:rounded-full"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;