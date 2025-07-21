import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 text-sm py-6 mt-auto ">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="mb-2 md:mb-0">
                    <span className="text-green-400 font-semibold text-lg mr-1">&copy;</span>
                    {new Date().getFullYear()}
                    <span className="logo font-bold text-white text-2xl ml-1">
                        <span className="text-green-700">&lt;</span>
                        Pass
                        <span className="text-green-700">man/ &gt;</span>
                    </span>
                    <span className="ml-2 ">| Open Source by
                        <a href="https://github.com/RISTONRODZ" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                            Riston
                        </a>
                    </span>
                </p>
                <div className="flex gap-4">

                    <a href="https://www.linkedin.com/in/riston-rodrigues/" className="hover:text-white transition">Contact</a>
                </div>
            </div>
        </footer>
    )
}
