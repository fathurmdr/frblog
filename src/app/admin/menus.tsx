import {
  MdEditDocument,
  MdFormatListBulleted,
  MdSpaceDashboard,
} from "react-icons/md";

export const menus = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard size={24} className="text-white" />,
    href: "/admin",
  },
  {
    title: "Posts",
    icon: <MdEditDocument size={24} className="text-white" />,
    href: "/admin/posts",
  },
  {
    title: "Series",
    icon: <MdFormatListBulleted size={24} className="text-white" />,
    href: "/admin/series",
  },
];
