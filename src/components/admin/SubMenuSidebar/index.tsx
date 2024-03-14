import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SubMenuSidebarProps {
  title: string;
  href: string;
  onClick?: () => void;
}

export default function SubMenuSidebar({
  title,
  href,
  onClick,
}: SubMenuSidebarProps) {
  const pathname = usePathname();
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`w-full rounded-sm p-2 pl-4 text-white hover:bg-meta-4 ${
          pathname.includes(href) && "bg-meta-4"
        }`}
      >
        {title}
      </div>
    </Link>
  );
}
