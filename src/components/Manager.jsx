import React, { useEffect, useState } from 'react';
import addIcon from '../assets/add.svg';
import showIcon from '../assets/show.svg';
import hideIcon from '../assets/hide.svg';

const Manager = () => {
    const [form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    });

    const [isVisible, setIsVisible] = useState(false);
    const [passwordArray, setPasswordArray] = useState([])
    const togglePassword = () => {
        setIsVisible(prev => !prev);
    };
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = () => {
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log(...passwordArray, form);

    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
            </div>

            <div className="mx-auto max-w-4xl mycontainer">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-900">man/ &gt;</span>
                </h1>
                <p className="text-green-700 text-center text-lg">Your own password manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        name="site"
                        type="text"
                        placeholder="Website URL"
                        className="rounded-full border border-green-700 w-full px-4 py-1"
                    />

                    <div className="flex w-full gap-8 justify-between">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                            type="text"
                            placeholder="Enter Username"
                            className="rounded-full border border-green-700 w-full px-4 py-1"
                        />
                        <div className="relative w-full">
                            <div className="relative w-full">
                                <input
                                    value={form.password}
                                    onChange={handleChange}
                                    name="password"
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="rounded-full border border-green-700 w-full px-4 py-1 pr-10"
                                />
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={togglePassword}
                                >
                                    <img
                                        src={isVisible ? hideIcon : showIcon}
                                        alt="Toggle visibility"
                                        className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-110"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-2 transition justify-center"
                    >
                        Add Password
                    </button>
                </div>
                <div className="passwords text-center text-2xl text-green-500">
                    <h2 className="">Your Passwords</h2>
                    <table className="table-auto w-full bg-green-800 text-white">
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td>Malcolm Lockyer</td>
                                <td>1961</td>
                            </tr>
                            <tr>
                                <td>Witchy Woman</td>
                                <td>The Eagles</td>
                                <td>1972</td>
                            </tr>
                            <tr>
                                <td>Shining Star</td>
                                <td>Earth, Wind, and Fire</td>
                                <td>1975</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Manager;
