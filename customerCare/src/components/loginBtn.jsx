import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Default import

export default function LoginBtn() {
    const navigate = useNavigate();

    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);

        const { credential } = response;
        try {
            const decodedToken = jwtDecode(credential);
            
            localStorage.setItem('userID', decodedToken.sub);
            localStorage.setItem('userName', decodedToken.name);
            localStorage.setItem('userImage', decodedToken.picture);
            localStorage.setItem('userEmail', decodedToken.email);

            // Navigate to the landing page after successful login
            navigate("/landing");
        } catch (error) {
            console.error("Error decoding JWT:", error);
        }
    };

    const handleLoginFailure = (response) => {
        console.log('Login Failed:', response);
    };

    return (
        <div>
            <GoogleOAuthProvider clientId="293043425047-g3fn506hupetpqhhq0bd4doh2upr7ju2.apps.googleusercontent.com">
                <div className="flex flex-col justify-center items-center h-screen gap-4 w-full">
                    <h1 className='text-3xl font-medium text-stone-500'>Login with Google</h1>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                    />
                </div>
            </GoogleOAuthProvider>
        </div>
    );
}
