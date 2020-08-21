
import React from 'react'
import { MdMemory, MdGroupWork, MdStorage, MdEqualizer, MdCompare, MdAssignment, 
         MdNotifications, MdAttachMoney } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'


const MENU = {

    '/dashboard': {
        name: 'Dashboard',
        icon: <MdEqualizer />, //equalizer
    },

    '/devices': {
        name: 'Devices',
        icon: <MdMemory />,
    },

    '/groups': {
        name: 'Groups',
        icon: <MdGroupWork />
    },

    '/comparatives': {
        name: 'Comparatives',
        icon: <MdCompare />
    },

    '/reports': {
        name: 'Reports',
        icon: <MdAssignment />
    },

    '/notifications': {
        name: 'Notifications',
        icon: <MdNotifications />
    },

    '/profiles': {
        name: 'Users',
        icon: <FaUsers />
    },

    '/tariffs': {
        name: 'Tariffs',
        icon: <MdAttachMoney />
    },

    '/storage': {
        name: 'Server',
        icon: <MdStorage />
    },

}

export default MENU
