import { navbarLinks } from "./data";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${
        isScrolled
          ? "bg-[#141414] transition duration-200"
          : "bg-transparent transition duration-1000"
      } py-4`}
    >
      <div className="ml-2 flex items-center space-x-2 md:space-x-8">
        <img
          src="https://fontmeme.com/permalink/220514/8e630bfe7af5a5909c7a23d812300c6e.png"
          alt="traiflix logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-5 md:flex">
          {navbarLinks.map((link) => (
            <div className="navbar-element">
              <Link href={link.link}>{link.name}</Link>
            </div>
          ))}
        </ul>
      </div>
      <div className="mr-9 flex items-center space-x-6 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 cursor-pointer transition duration-200 ease-out hover:scale-110 sm:inline" />
        <p className="lg:navbar-element hidden cursor-pointer transition duration-200 lg:inline">
          Kids
        </p>
        <BellIcon className="h-6 w-6 cursor-pointer transition duration-200 ease-out hover:scale-110" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt="Kids"
            className="cursor-pointer rounded transition duration-200 ease-out hover:scale-110"
          />
        </Link>
      </div>
    </header>
  );
};

export { Header };
