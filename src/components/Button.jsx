import React from "react";


function Button({ type = 'button', children, className = '', ...props }) {

    return (
        <button
            type={type}
            className={`${className}`}
            {...props}
        >
            {children}
        </button>
    )

}

export default Button;