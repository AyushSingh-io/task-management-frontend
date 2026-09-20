import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Protected({ children, authentication = false }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        console.log("Protected running:", {
            authentication,
            authStatus,
            path: window.location.pathname
        });

        if (authentication && !authStatus) {
            console.log("REDIRECTING TO LOGIN");
            navigate("/login", );
            return;
        }

        if (!authentication && authStatus) {
            console.log("REDIRECTING TO HOME");
            navigate("/");
            return;
        }

        setLoader(false);
    }, [navigate, authentication, authStatus]);

    return loader ? <h1>Loading...</h1> : <> {children} </>
}

export default Protected;