"use client";

import { ThemeMode } from "@/components/theme-mode-util";
import { Calendar, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useUser } from "../context/auth-provider";
import { Icons } from "../ui/icons";

type NavLink = {
  to: string;
  label: string;
};

const navLinks: NavLink[] = [
  { to: "features", label: "Features" },
  { to: "demo", label: "Demo" },
  { to: "pricing", label: "Pricing" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const handleSignOut = async () => {
    setLoading(true);
    await user.logout();
    setLoading(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {isLandingPage &&
        navLinks.map((link) => (
          <ScrollLink
            key={link.to}
            to={link.to}
            spy={true}
            smooth={true}
            offset={-64}
            duration={500}
            onClick={() => setIsMenuOpen(false)}
            className={`
            font-medium transition-all duration-300 ease-in-out
            relative overflow-hidden group
            ${isMobile ? "text-lg mb-4" : "text-sm"}
          `}
          >
            <span className="relative z-10">{link.label}</span>
            <span
              className="absolute bottom-0 left-0 w-full h-[0.08rem] bg-foreground 
              transform -translate-x-full group-hover:translate-x-0 
              transition-transform duration-300 ease-in-out"
            />
          </ScrollLink>
        ))}
      {user.current ? (
        <>
          <Link
            href="/dashboard"
            className={`
            font-medium transition-all duration-300 ease-in-out
            relative overflow-hidden group
            ${isMobile ? "text-lg mb-4" : "text-sm"}
          `}
          >
            <span className="relative z-10">Dashboard</span>
            <span
              className="absolute bottom-0 left-0 w-full h-[0.08rem] bg-foreground 
              transform -translate-x-full group-hover:translate-x-0 
              transition-transform duration-300 ease-in-out"
            />
          </Link>
          <div
            className={`
            font-medium transition-all duration-300 ease-in-out
            relative overflow-hidden group hover:cursor-pointer
            ${isMobile ? "text-lg mb-4" : "text-sm"}
          `}
            onClick={handleSignOut}
          >
            {loading ? (
              <Icons.spinner className="size-4 animate-spin" />
            ) : (
              <>
                <span className="relative z-10">Sign Out</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-[0.08rem] bg-foreground 
                  transform -translate-x-full group-hover:translate-x-0 
                  transition-transform duration-300 ease-in-out"
                />
              </>
            )}
          </div>
        </>
      ) : (
        <Link
          href="/sign-in"
          className={`
            font-medium transition-all duration-300 ease-in-out
            relative overflow-hidden group hover:cursor-pointer
            ${isMobile ? "text-lg mb-4" : "text-sm"}
          `}
        >
          <span className="relative z-10">Sign In</span>
          <span
            className="absolute bottom-0 left-0 w-full h-[0.08rem] bg-foreground 
            transform -translate-x-full group-hover:translate-x-0 
            transition-transform duration-300 ease-in-out"
          />
        </Link>
      )}
    </>
  );

  return (
    <header
      className={`bg-background border-b px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full z-50 shadow-sm`}
    >
      <Link className="flex items-center justify-center" href="/">
        <Calendar className="h-8 w-8" />
        <span className="ml-2 text-xl font-bold leading-snug tracking-tighter">
          Cal Buddy
        </span>
      </Link>

      <button
        className="ml-auto sm:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={
          isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"
        }
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-background" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isMenuOpen && (
        <nav className="fixed text-white top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center sm:hidden">
          <NavLinks isMobile />
        </nav>
      )}

      <nav className="ml-auto flex flex-row items-center hidden sm:flex gap-4 sm:gap-6">
        <NavLinks />
      </nav>
      <ThemeMode />
    </header>
  );
}
