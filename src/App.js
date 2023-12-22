import React from 'react'
import './App.css'
import 'tailwindcss/tailwind.css';
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import OrderStatus from './components/OrderStatus';
import Warehouse from './components/Warehouse';
import { ContextProvider } from './contexts/ContextProvider';
import { useStateContext } from './contexts/ContextProvider';

import { Line, Area, Bar, Pie, Financial, Employees, Customers, Stacked, Pyramid, ColorMapping } from './pages';





const App = () => {
    const { activeMenu, currentColor, themeSettings } = useStateContext();
    // const activeMenu = true;
    return (

        <BrowserRouter>
            <Header />

            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/orders" element={<OrderStatus />} />
                <Route exact path="/home" element={<Warehouse />} />
                <Route exact path="/line" element={<Line />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

            </Routes>
        </BrowserRouter>

    )
}

export default App