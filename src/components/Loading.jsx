import React from "react";

function Loading({ message = "Loading..." }) {
    return (
        <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600"></div>

                <p className="text-sm text-slate-600">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default Loading;