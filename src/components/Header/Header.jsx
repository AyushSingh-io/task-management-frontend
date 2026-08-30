import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutButton from './LogoutButton.jsx'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            active: authStatus
        },
        {
            name: 'Projects',
            link: '/projects',
            active: authStatus
        },
        {
            name: 'MyTasks',
            link: '/my-tasks',
            active: authStatus
        },
        {
            name: 'login',
            link: '/login',
            active: !authStatus
        },
        {
            name: 'signup',
            link: '/signup',
            active: !authStatus
        },

        {
            name : 'profile',
            link : '/profile',
            active : authStatus
        }

    ]


    return (
        <header className="border-b">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    TaskFlow
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    {navItems.map((item) =>
                        item.active ? (
                            <button key={item.name} onClick={() => navigate(item.link)}>
                                {item.name}
                            </button>
                        ) : null
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {
                        authStatus && <LogoutButton/>
                    }
                </div>

            </nav>
        </header>
    );
}

export default Header;