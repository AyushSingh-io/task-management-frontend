import React from "react";

function ErrorMessage({
    message = "Something went wrong.",
    onRetry
}) {
    return (
        <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                    <svg
                        className="h-8 w-8 text-red-600 dark:text-red-400"
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

                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {message}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-6 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                    >
                        Try Again
                    </button>
                )}

            </div>
        </div>
    );
}

export default ErrorMessage;
