import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";
import { Button } from "../index.js";
import { toggleTheme } from "../../store/themeSlice.js";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch();


    const navItems = [
        {
            name: "Dashboard",
            link: "/",
            active: authStatus
        },
        {
            name: "Projects",
            link: "/projects",
            active: authStatus
        },
        {
            name: "My Tasks",
            link: "/my-tasks",
            active: authStatus
        },
        {
            name: "Login",
            link: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            link: "/signup",
            active: !authStatus
        },
        {
            name: "Profile",
            link: "/profile",
            active: authStatus
        }
    ];

    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
    }

    return (
        <header className="border-b border-blue-100 bg-white shadow-sm dark:border-blue-900 dark:bg-slate-900">

            <nav className="mx-auto max-w-7xl px-4">

                {/* Top Header */}
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-tight text-blue-700 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        TaskFlow
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-10 md:flex">

                        {navItems.map((item) =>
                            item.active ? (
                                <Link
                                    key={item.name}
                                    to={item.link}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                >
                                    {item.name}
                                </Link>
                            ) : null
                        )}

                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">

                        {/* Theme Toggle */}
                        <Button
                            onClick={toggleThemeHandler}
                            type="button"
                            className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                            aria-label="Toggle dark mode"
                        >
                            {theme === "dark" ? <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    strokeWidth="2"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="M12 2v2
                   M12 20v2
                   M4.93 4.93l1.42 1.42
                   M17.65 17.65l1.42 1.42
                   M2 12h2
                   M20 12h2
                   M4.93 19.07l1.42-1.42
                   M17.65 6.35l1.42-1.42"
                                />
                            </svg>
                                :
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 12.79A9 9 0 1 1 11.21 3
                   7 7 0 0 0 21 12.79Z"
                                    />
                                </svg>
                            }
                        </Button>

                        {authStatus && <LogoutButton />}

                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 md:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </Button>

                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="border-t border-blue-100 py-3 dark:border-blue-900 md:hidden">

                        <div className="flex flex-col gap-1">

                            {navItems.map((item) =>
                                item.active ? (
                                    <Link
                                        key={item.name}
                                        to={item.link}
                                        onClick={() => setMenuOpen(false)}
                                        className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                    >
                                        {item.name}
                                    </Link>
                                ) : null
                            )}

                            {/* Theme Toggle */}
                            <Button
                                onClick={toggleThemeHandler}
                                type="button"
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                aria-label="Toggle dark mode"
                            >
                                {theme === "dark" ? <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="4"
                                        strokeWidth="2"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="M12 2v2
                   M12 20v2
                   M4.93 4.93l1.42 1.42
                   M17.65 17.65l1.42 1.42
                   M2 12h2
                   M20 12h2
                   M4.93 19.07l1.42-1.42
                   M17.65 6.35l1.42-1.42"
                                    />
                                </svg>
                                    :
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12.79A9 9 0 1 1 11.21 3
                   7 7 0 0 0 21 12.79Z"
                                        />
                                    </svg>
                                }
                            </Button>

                            {authStatus && (
                                <div className="mt-2 border-t border-blue-100 pt-3 dark:border-blue-900">
                                    <LogoutButton />
                                </div>
                            )}

                        </div>

                    </div>
                )}

            </nav>

        </header>
    );
}

export default Header;