import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import ButtonText from "./Button";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-sky-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-40 mr-2" src={logo} alt="logo" />
                    </div>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <ButtonText text="Entrar" />
                        <ButtonText text="Criar Conta" />
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-light-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <div className="flex space-x-6 ">
                            <ButtonText text="Entrar" />
                            <ButtonText text="Criar Conta" />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;