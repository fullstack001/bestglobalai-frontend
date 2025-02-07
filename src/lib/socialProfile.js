import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";

export const socialProfiles = [
  {
    name: "Bluesky",
    icon: <GiButterfly className="text-blue-500 w-8 h-8" />,
    active: false,
    key: "bluesky",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="text-blue-600 w-8 h-8" />,
    active: false,
    key: "facebook",
  },
  {
    name: "Google Business Profile",
    icon: <FaGoogle className="text-red-500 w-8 h-8" />,
    active: false,
    key: "gmb",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-pink-500 w-8 h-8" />,
    active: false,
    key: "instagram",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-blue-700 w-8 h-8" />,
    active: false,
    key: "linkedin",
  },
  {
    name: "Pinterest",
    icon: <FaPinterest className="text-red-600 w-8 h-8" />,
    active: false,
    key: "pinterest",
  },
  {
    name: "Reddit",
    icon: <FaReddit className="text-orange-500 w-8 h-8" />,
    active: false,
    key: "reddit",
  },
  {
    name: "Telegram",
    icon: <FaTelegram className="text-blue-400 w-8 h-8" />,
    active: false,
    key: "telegram",
  },
  {
    name: "TikTok",
    icon: <FaTiktok className="text-black w-8 h-8" />,
    active: false,
    key: "tiktok",
  },
  {
    name: "X/Twitter",
    icon: <FaTwitter className="text-blue-400 w-8 h-8" />,
    active: false,
    key: "twitter",
  },
  {
    name: "YouTube",
    icon: <FaYoutube className="text-red-600 w-8 h-8" />,
    active: false,
    key: "youtube",
  },
];
