import Logo from "../icons/Logo";
import { OrganizationSwitcher, useAuth, UserButton } from "@clerk/nextjs";

const Header = () => {
    // const {orgId} = useAuth()

    return (
        <div className=" flex justify-between p-3 shadow-sm">
            <Logo />
            <OrganizationSwitcher
                afterLeaveOrganizationUrl="/dashboard"
                afterCreateOrganizationUrl={"/dashboard"}
            />
            <UserButton />
        </div>
    );
};

export default Header;
