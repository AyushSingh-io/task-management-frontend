import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Protected({ children, authentication = false }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {

        if (authentication && !authStatus ) {
            navigate('/login');
        }

        if (!authentication && authStatus) {
            navigate('/dashboard');
        }

        setLoader(false);

    }, [navigate, authentication, authStatus])

    return loader ? <h1>Loading...</h1> : <> {children} </>
}

export default Protected;