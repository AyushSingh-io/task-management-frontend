import React from "react";

function ErrorMessage({
    message = "Something went wrong.",
    onRetry
}) {
    return (
        <div className="flex flex-1 items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m0 3.75h.01M10.29 3.86l-7.18 12a2 2 0 001.72 3h14.34a2 2 0 001.72-3l-7.18-12a2 2 0 00-3.42 0z"
                        />
                    </svg>
                </div>

                <h2 className="text-xl font-semibold text-slate-800">
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    {message}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-6 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export default ErrorMessage;