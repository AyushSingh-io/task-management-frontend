import React from "react";

function Footer() {
    return (
        <footer className="border-t border-indigo-100 bg-white">

            <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-6">

                <p className="text-sm text-slate-500">
                    © 2026{" "}
                    <span className="font-semibold text-indigo-600">
                        TaskFlow
                    </span>
                    . All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;