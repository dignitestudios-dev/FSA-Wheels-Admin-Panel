
import { Blocks } from 'lucide-react';
import { User } from 'lucide-react';
import { Car } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import { File } from 'lucide-react';
import { Bell } from 'lucide-react';
import { IoCarSportOutline } from "react-icons/io5";
import { Info } from 'lucide-react';



export const sidebarData = [
  {
    title: "Dashboard",
    icon:  <Blocks />,
    link: "/app/dashboard",
  },
  {
    title: "Users",
    icon:  <User />,
    link: "/app/users",
  },
  {
    title: "Inventory",
    icon: <Car />,
    link: "/app/inventory",
  },
    {
    title: "Reservations",
    icon: <File />,
    link: "/app/reservations",
  },

//  {
//     title: "Create User",
//     icon: <UserPlus />,
//     link: "/app/create-user",
//   },

  {
    title: "SOS Requests",
    icon: <Info />,
    link: "/app/sos",
  },
  
  //  {
  //   title: "Rides",
  //   icon: <IoCarSportOutline className='text-2xl' />,
  //   link: "/app/rides",
  // },

  { 
    title: "Push Notifications",
    icon: <Bell />,
    link: "/app/notifications",
  },

  
];
