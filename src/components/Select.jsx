import React, { forwardRef, useId } from "react";


function Select({ label, options, className, ...props }, ref) {
    const id = useId()

    return (
        <div>
            {label && <label htmlFor={id} > {label} </label>}

            <select
                id={id}
                className={`${className}`}
                ref={ref}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default forwardRef(Select);