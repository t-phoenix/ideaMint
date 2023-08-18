import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mylogo from '../assets/mylogo.svg';
import sun from '../assets/sun.svg';
import {navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
        {!isActive ? (
            <div>
                <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
                <p>{name}</p>
            </div>
        ) : (
            <div>
                <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
                <p className='icon-title'>{name}</p>
            </div>
        )}
    </div>
)

export default function Sideabar() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    return (
        <div className='sidebar'>
            <div className='logo-box'>
                <Link to="/">
                    <Icon imgUrl={mylogo} />
                </Link>

            </div>
            

            <p></p>

            <div className="">
                <div className="sidebar-nav">
                    {navlinks.map((link) => (
                        <Icon
                            className = "side-icons"
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                if (!link.disabled) {
                                    setIsActive(link.name);
                                    navigate(link.link);
                                }
                            }}
                        />
                    ))}
                </div>

                <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
            </div>
        </div>
    )
}