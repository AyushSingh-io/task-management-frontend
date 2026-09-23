
import React, { useId } from "react";
import { forwardRef } from "react";

function Input(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">

            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                ref={ref}
                className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/50 ${className}`}
                {...props}
            />

        </div>
    );
}

export default forwardRef(Input);

