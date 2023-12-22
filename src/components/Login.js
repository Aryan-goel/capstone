import React, { useState } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri';
import { MdPassword } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import axios from 'axios';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import Sidebar from './Sidebar';
import { SiShopware } from 'react-icons/si';
import { PiWarehouseBold } from 'react-icons/pi'
// import { useNavigate } from 'react-router-dom';






const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false); // Add authenticated state


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login/', { username, password });
            console.log('error', response);

            if (response.status === 200) {
                setAuthenticated(true); // Mark the user as authenticated
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!authenticated) {
        return (

            <>
                <div className="logo">
                    {/* <img src={logo} alt="logo" className='' /> */}
                    <PiWarehouseBold size={80} /> <h1 style={{ fontSize: '2rem', fontWeight: 'bold', padding: '1rem' }}>Shoppy</h1>
                </div>
                <form onSubmit={handleSubmit}>


                    <div className='login'>

                        <RiShoppingCartFill size={150} color='black' />
                        <div className='input-wrapper'>
                            <AiOutlineUser size={40} color='#03c9d7' />
                            <input
                                placeholder='USERNAME'
                                className='email-input'
                                type=""
                                name="email"
                                id=""
                                onChange={(e) => setUsername(e.target.value)}

                            />
                        </div>
                        <div className='input-wrapper'>
                            <MdPassword size={40} color='#03c9d7' />
                            <input
                                placeholder='PASSWORD'
                                className='email-input'
                                type="password"
                                name="email"
                                id=""
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className='login-button'>
                            LOGIN
                        </button>
                    </div>
                </form>

            </>



        )

    }
    navigate('/home');

    // You can also return a loading indicator here while the redirection is happening
    return <p>Redirecting...</p>;


}

export default Login;