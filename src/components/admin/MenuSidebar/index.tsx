import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SubMenuSidebar, { SubMenuSidebarProps } from "../SubMenuSidebar";

export interface MenuSidebarProps {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onlyAdministrator?: boolean;
  submenus?: SubMenuSidebarProps[];
  onClick?: () => void;
}

export default function MenuSidebar({
  title,
  icon,
  href = "",
  submenus = [],
  onClick,
}: MenuSidebarProps) {
  const [active, setActive] = useState(false);
  const [subMenusHeight, setSubMenusHeight] = useState(0);

  const submenuRef = useRef<HTMLUListElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const subMenus = submenuRef.current;
    if (subMenus) {
      setSubMenusHeight(subMenus.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (submenus.find((submenu) => pathname.includes(submenu.href))) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);
  return (
    <div>
      {href ? (
        <Link
          href={href}
          className={`mb-2 flex cursor-pointer items-center rounded-sm p-2 hover:bg-meta-4 ${
            pathname === href && "bg-meta-4"
          }`}
          onClick={onClick}
        >
          {icon}
          <span className="ml-2 flex-1 whitespace-nowrap text-left text-white">
            {title}
          </span>
        </Link>
      ) : (
        <div
          className={`mb-2 flex cursor-pointer items-center rounded-sm p-2 hover:bg-meta-4 ${
            submenus.find((submenu) => pathname.includes(submenu.href)) &&
            "bg-meta-4"
          }`}
          onClick={() => setActive(!active)}
        >
          {icon}
          <span className="ml-2 flex-1 whitespace-nowrap text-left text-white">
            {title}
          </span>
          <MdKeyboardArrowDown
            size={24}
            className={`text-white transition-transform duration-300 ${
              active && "-scale-y-100"
            }`}
          />
        </div>
      )}
      {submenus && (
        <div
          style={{
            height: `${active ? `${subMenusHeight}px` : "0"}`,
          }}
          className="ml-4 flex cursor-pointer items-center overflow-hidden transition-all duration-500 ease-in-out"
        >
          <ul ref={submenuRef} className="flex w-full flex-col gap-2">
            {submenus.map((submenu, index) => (
              <li key={index}>
                <SubMenuSidebar
                  title={submenu.title}
                  href={submenu.href}
                  onClick={onClick}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
