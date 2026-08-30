import React from "react";
import authService from "../../services/authService.js";
import { useDispatch } from "react-redux";
import { logout } from '../../store/authSlice.js'



function LogoutButton() {

    const dispatch = useDispatch()

    const logOutHandler = () => {
        authService.logout()
            .then(() => dispatch(logout()))
    }

    return (
        <button onClick={logOutHandler}>
            LogOut
        </button>
    )
}

export default LogoutButton;