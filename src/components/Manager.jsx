import React from 'react'

const Manager = () => {
    return (<>

        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
        <div className=" mx-auto  max-w-4xl mycontainer">
            <h1 className="text-4xl font-bold text-center">
                <span className="text-green-700">
                    &lt;
                </span>
                Pass
                <span className="text-green-700">
                    man/ &gt;
                </span>
            </h1>
            <p className='text-green-700 text-lg'>Your own password manager</p>
            <div className="text-white flex flex-col p-4 bg-blue-500">
                <input className='rounded-full' type="text" />
                <div className="flex">
                    <input type="text" />
                    <input type="text" />
                </div>
            </div>
        </div>
    </>
    )
}

export default Manager