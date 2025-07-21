import React, { useEffect, useState } from 'react';
import addIcon from '../assets/add.svg';
import showIcon from '../assets/show.svg';
import hideIcon from '../assets/hide.svg';
import copyIcon from '../assets/copy.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [isVisible, setIsVisible] = useState(false);
    const [passwordArray, setPasswordArray] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const togglePassword = () => {
        setIsVisible(prev => !prev);
    };

    const getPasswords = async () => {
        try {
            const response = await fetch("http://localhost:3000/");
            const passwords = await response.json();
            setPasswordArray(passwords);
        } catch (error) {
            console.error("Failed to fetch passwords:", error);
            toast.error("Could not load passwords.");
        }
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = async () => {
        if (!form.site || !form.username || !form.password) return;

        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Password Saved!");
                setForm({ site: "", username: "", password: "" });
                getPasswords();
            } else {
                toast.error("Save failed.");
            }
        } catch (err) {
            console.error("Error saving password:", err);
            toast.error("Save error.");
        }
    };

    const deletePassword = async (idToDelete) => {
        try {
            const response = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: idToDelete })
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Deleted!");
                getPasswords();
            } else {
                toast.error("Delete failed.");
            }
        } catch (err) {
            console.error("Error deleting password:", err);
            toast.error("Delete error.");
        }
    };

    const editPassword = (id) => {
        const toEdit = passwordArray.find(item => item._id === id);
        if (toEdit) {
            setForm({
                site: toEdit.site,
                username: toEdit.username,
                password: toEdit.password
            });
            setIsEditing(true);
            setEditId(id);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
            toast.success("Copied!");
        } catch (err) {
            console.error("Copy failed:", err);
            toast.error("Copy failed!");
        }
    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
            </div>

            <div className="w-full px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-900">man/ &gt;</span>
                </h1>
                <p className="text-green-700 text-center text-lg">Your own password manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} name="site" type="text" placeholder="Website URL with https://" className="rounded-full border border-green-700 w-full px-4 py-1" />

                    <div className="flex flex-col sm:flex-row w-full gap-4">
                        <input value={form.username} onChange={handleChange} name="username" type="text" placeholder="Enter Username" className="rounded-full border border-green-700 w-full px-4 py-1" />
                        <div className="relative w-full">
                            <input value={form.password} onChange={handleChange} name="password" type={isVisible ? 'text' : 'password'} placeholder="Password" className="rounded-full border border-green-700 w-full px-4 py-1 pr-10" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePassword}>
                                <img src={isVisible ? hideIcon : showIcon} alt="Toggle visibility" className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-110" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-2 transition justify-center">
                        <img src={addIcon} alt="Add" className="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-180" />
                        Save Password
                    </button>
                </div>
            </div>

            <h2 className="font-bold text-3xl text-green-500 md:text-2xl text-center">Your Passwords</h2>
            <div className="passwords text-center md:text-2xl text-green-500 overflow-x-auto md:w-[80%] mx-auto">
                {passwordArray.length === 0 ? (
                    <div>No passwords to show</div>
                ) : (
                    <table className="min-w-full table-auto rounded-md overflow-hidden mt-4">
                        <thead className='bg-green-800 text-white'>
                            <tr className='border-2 border-white'>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => (
                                <tr key={item._id} className='border-2 border-white'>
                                    <td className='border-2 border-white py-2 px-4'>
                                        <div className="flex items-center justify-between gap-2 overflow-hidden max-w-full">
                                            <span className="truncate cursor-pointer">
                                                <a href={item.site} target='_blank' rel="noreferrer">{item.site}</a>
                                            </span>
                                            <img src={copyIcon} alt="Copy Site" className="w-6 h-6 cursor-pointer" onClick={() => copyToClipboard(item.site)} />
                                        </div>
                                    </td>
                                    <td className='border-2 border-white py-2 px-4'>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="truncate">{item.username}</span>
                                            <img src={copyIcon} alt="Copy Username" className="w-6 h-6 cursor-pointer" onClick={() => copyToClipboard(item.username)} />
                                        </div>
                                    </td>
                                    <td className='border-2 border-white py-2 px-4'>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="truncate">{item.password}</span>
                                            <img src={copyIcon} alt="Copy Password" className="w-6 h-6 cursor-pointer" onClick={() => copyToClipboard(item.password)} />
                                        </div>
                                    </td>
                                    <td className='border-2 border-white py-2 px-4'>
                                        <div className="flex justify-center gap-4 items-center">
                                            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-500" onClick={() => editPassword(item._id)}>
                                                <img src={editIcon} alt="Edit" className="w-6 h-6" />
                                                <span>Edit</span>
                                            </span>
                                            <span className="flex items-center gap-1 cursor-pointer hover:text-red-500" onClick={() => deletePassword(item._id)}>
                                                <img src={deleteIcon} alt="Delete" className="w-7 h-7" />
                                                <span>Delete</span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} theme="light" />
            </div>
        </>
    );
};

export default Manager;
