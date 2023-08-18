import { createCampaign, dashboard, logout, payment, profile, withdraw, glogo, rocket } from '../assets';

export const navlinks = [
  {
    name: 'Explorer',
    imgUrl: dashboard,
    link: '/explorer',
  },
  {
    name: 'start',
    imgUrl: logout,
    link: '/create',
  },
  {
    name: 'Trxn',
    imgUrl: withdraw,
    link: '/transaction',
  },
  {
    name: 'token',
    imgUrl: payment,
    link: '/token',

  },

  {
    name: 'Learn',
    imgUrl: profile,
    link: '/learn',
  },
];




