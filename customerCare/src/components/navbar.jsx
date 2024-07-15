import React, { useEffect, useState } from 'react';

export default function Navbar() {
    const [user, setUser] = useState({
        name: '',
        image: ''
    });

    useEffect(() => {
        // Retrieve user information from local storage
        const userName = localStorage.getItem('userName');
        const userImage = localStorage.getItem('userImage');

        setUser({
            name: userName,
            image: userImage
        });
    }, []);

    return (
        <div className='flex justify-between shadow-xl p-3'>
            <p className='text-xl'>Customer Resolve</p>
            <div className='flex items-center gap-2 '>
                {user.image && <img src={user.image} alt="User profile" className='rounded-full w-8 h-8' />}
                <button className='border  p-1 w-32 rounded-lg'>{user.name ? user.name : 'Hello'}</button>
            </div>
        </div>
    );
}
