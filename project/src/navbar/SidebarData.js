import React from 'react';
import * as BsIcons from 'react-icons/bs';
import { AiFillPlayCircle } from 'react-icons/ai';
import {FaUserCog} from 'react-icons/fa';
import {FaUserPlus} from 'react-icons/fa';
import {FaUserCheck} from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text'
  },
  {
    title: 'Main',
    path: '/main',
    icon: <AiFillPlayCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Join',
    path: '/join',
    icon: <FaUserPlus/>,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <FaUserCheck/>,
    cName: 'nav-text'
  },
  {
    title: 'Mypage',
    path: '/mypage',
    icon: <FaUserCog/>,
    cName: 'nav-text'
  }
];