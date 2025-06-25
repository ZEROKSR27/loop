import { Menu } from "lucide-react";
import Logo from "../icons/Logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
    "Product",
    "Solutions",
    "Docs",
    "LinkFour",
    "LinkFive",
    "Pricing",
    "Company",
];

const Header = () => {
    return (
        <div className=" flex justify-between p-3  shadow-sm  sm:px-[10%] lg:px-[5%] xl:px-[10%]">
            <div className="flex items-center space-x-10">
                <Logo />

                <nav className=" space-x-2 hidden lg:flex">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            href={"#"}
                            className="px-2 py-1.5 text-sm font-medium hover:bg-gray-900/5 rounded-md"
                        >
                            {link}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex space-x-2 w-[86px] justify-end">
                <OrganizationSwitcher
                    afterLeaveOrganizationUrl="/dashboard"
                    afterCreateOrganizationUrl={"/dashboard"}
                />
                <UserButton />
                <Menu className="sm:hidden" />
            </div>
        </div>
    );
};

export default Header;
