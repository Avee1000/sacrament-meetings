'use client'

import { EditIcon, Trash2, Ellipsis } from "lucide-react";
import { useState } from "react";

export default function HoverOptions() {
    const [ishover, setIsHover] = useState(false);
    // const [isEllipsisHover, setIsEllipsisHover] = useState(false);

    if (ishover) {
        console.log('hover')
    }


    return (
        <div className={`relative w-full h-10 transition-all duration-300 overflow-hidden group opacity-100`}
        onMouseEnter={() => setIsHover(false)}>
            {/* Ellipsis: Stays visible when clicked / ishover is true */}
            <div
                className={`top-0 right-0 size-8 absolute grid place-items-center transition-all duration-300 bg-white rounded-full cursor-pointer shadow-md z-10 `}
                onClick={() => setIsHover(!ishover)}>
                <Ellipsis className="size-5 text-black" />
            </div>

            {/* Edit & Delete Buttons Container */}
            <div
                className={`flex flex-row top-0 right-0 absolute items-center transition-all duration-300 ${ishover ? 'space-x-1 pr-9' : 'space-x-0 pr-0'}`}
            >
                {/* Edit Button (Slides out to the left of the ellipsis) */}
                <button
                    className={`bg-white size-8 shadow-md rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all duration-500 transform ${ishover
                            ? 'opacity-100 scale-100 translate-x-0'
                            : 'opacity-0 scale-50 translate-x-4 pointer-events-none'
                        }`}
                    aria-label="Edit meeting">
                    <EditIcon className="text-black size-5" />
                </button>

                {/* Delete Button (Slides out further to the left) */}
                <button
                    className={`bg-white size-8 shadow-md rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all duration-300 transform ${ishover
                            ? 'opacity-100 scale-100 translate-x-0'
                            : 'opacity-0 scale-50 translate-x-4 pointer-events-none'
                        }`}
                    aria-label="Delete meeting">
                    <Trash2 className="text-black size-5" />
                </button>
            </div>
        </div>

    )
}


//     <div
//     className="relative w-50 block bg-red-500 h-20"
//     onMouseOver={() => setIsHover(true)}
//     onMouseLeave={() => setIsHover(false)}
// >
//     <div className={`flex flex-row top-0 right-0 absolute items-center transition-all duration-300 ${ishover ? 'space-x-2' : 'space-x-0'}`}>
//         {/* Delete Button (Animate in/out) */}
//         <button
//             className={`bg-white size-8 shadow-md rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all duration-300 transform ${ishover
//                     ? 'opacity-100 scale-100 translate-x-0'
//                     : 'opacity-0 scale-0 translate-x-8 pointer-events-none'
//                 }`}
//             aria-label="Delete Project"
//         >
//             <Trash2 className="text-black size-6" />
//         </button>

//         {/* Edit Button (Stays visible or acts as anchor) */}
//         <button
//             className="bg-white size-8 shadow-md rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors"
//             aria-label="Edit Project"
//         >
//             <EditIcon className="text-black size-6" />
//         </button>
//     </div>
// </div>




