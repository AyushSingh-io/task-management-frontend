import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";


function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();


    const navItems = [
        {
            name: "Dashboard",
            link: "/dashboard",
            active: authStatus
        },
        {
            name: "Projects",
            link: "/projects",
            active: authStatus
        },
        {
            name: "MyTasks",
            link: "/my-tasks",
            active: authStatus
        },
        {
            name: "login",
            link: "/login",
            active: !authStatus
        },
        {
            name: "signup",
            link: "/signup",
            active: !authStatus
        },
        {
            name: "profile",
            link: "/profile",
            active: authStatus
        }
    ];


    return (

        <header className="border-b border-indigo-100 bg-white shadow-sm">

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold tracking-tight text-indigo-700 transition hover:text-indigo-800"
                >
                    TaskFlow
                </Link>


                {/* Navigation */}
                <div className="hidden items-center gap-1 md:flex">

                    {navItems.map((item) =>
                        item.active ? (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.link)}
                                className="rounded-md px-3 py-2 text-sm font-medium capitalize text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                            >
                                {item.name}
                            </button>
                        ) : null
                    )}

                </div>


                {/* Actions */}
                <div className="flex items-center gap-3">

                    {authStatus && <LogoutButton />}

                </div>

            </nav>

        </header>
    );
}


export default Header;