import React from "react";
import authService from "../../services/authService.js";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";


function LogoutButton() {

    const dispatch = useDispatch();


    const logOutHandler = () => {
        authService.logout()
            .then(() => dispatch(logout()));
    };


    return (
        <button
            onClick={logOutHandler}
            className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-100 hover:text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-950/70 dark:hover:text-red-300"
        >
            Logout
        </button>
    );
}


export default LogoutButton;