import React from "react";

function ErrorMessage({
    message = "Something went wrong.",
    onRetry
}) {
    return (
        <div className="flex min-h-[200px] items-center justify-center">
            <div className="rounded-md bg-red-50 px-6 py-4 text-center">
                <p className="text-sm font-medium text-red-600">
                    {message}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-3 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
}

export default ErrorMessage;
