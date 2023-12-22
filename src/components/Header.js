import React, { useState } from 'react'
import { RiMenu2Line } from 'react-icons/ri'
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';
import { MdOutlineCancel } from 'react-icons/md';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb'
import { useStateContext } from '../contexts/ContextProvider';
import { SiShopware } from 'react-icons/si';
import { LiaWarehouseSolid } from 'react-icons/lia'
import { GoSidebarCollapse } from 'react-icons/go'



const Header = () => {
    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
    const [showSideBar, setShowSideBar] = useState(false);
    const iconStyle = { marginLeft: '1rem' }

    const toggleSideBar = () => {
        showSideBar === true ? setShowSideBar(false) : setShowSideBar(true);
    }
    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    return (

        <>
            <Sidebar />

            <div className="header">
                <button onClick={handleActiveMenu}>
                    <GoSidebarCollapse size={38} style={iconStyle} />

                </button>
                <div className="logo">
                    {/* <img src={logo} alt="logo" className='' /> */}
                    <LiaWarehouseSolid size={80} /> <h1 style={{ fontSize: '2rem', fontWeight: 'bold', padding: '1rem' }}>Shoppy</h1>
                </div>
                {/* <div className="sidebar-icon">

                <RiMenu2Line size={43} color={showSideBar===true ? 'black': 'white'} onClick={toggleSideBar} className='close-sidebar' />
            {
                 showSideBar ? <Sidebar/> :null
           }
            </div> */}
                {/* <div className='header'>
                <span onClick={event => window.location.href = '/home'}>Home</span>
                <span >Warehouse</span>
                <span>Retail</span>
            </div> */}
            </div>
        </>

    )
}

export default Header