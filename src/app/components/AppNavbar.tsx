import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import {
  CircleUserRound,
  Codesandbox,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

const AppNavbar = () => {
  const menuItems = [
    {
      label: "Products",
      href: "/products",
    },
    // {
    //   label: "Sales",
    //   href: "/sales",
    // },
    // {
    //   label: "Customize",
    //   href: "/customize",
    // },
  ];

  return (
    <nav className="w-full py-4 shadow-xl bg-emerald-900/50 backdrop-blur-3xl font-semibold">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link href={"/"}>
          <Codesandbox />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-4 uppercase">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink href={item.href}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger>
              <Search />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4 m-4">
              <Input placeholder="Search" />
            </PopoverContent>
          </Popover>

          <Link href={"/cart"}>
            <ShoppingCart />
          </Link>

          <Popover>
            <PopoverTrigger>
              <CircleUserRound />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4 m-4">
              <Link href="/auth?mode=register">
                <Button className="w-full" variant="outline">
                  Create account
                </Button>
              </Link>
              <Link href="/auth?mode=login">
                <Button className="w-full" variant="outline">
                  Sign in
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
