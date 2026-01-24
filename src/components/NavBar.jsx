import { Menu, X } from "lucide-react";
import useToggleList from "../hooks/useToggleList";


const Navbar = () => {

    const { visible, toggle } = useToggleList();
    return (
        <>
            <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                    <a href="/" className="p-10">
                        <span className="text-4xl font-bold text-neutral-200">O L I M P O</span>
                    </a>
                    <div className="hidden lg:flex justify-center space-x-12 items-center pr-10">
                        <a href="/student" className="text-neutral-500 text-lg hover:underline">Sou Estudante</a>
                        <a href="/teacher" className="text-neutral-500 text-lg pl-5 hover:underline">Sou Professor</a>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button className="p-10 text-neutral-500 font-bold" onClick={toggle}>
                            {visible ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {visible && (
                    <div className="fixed right-10 top-20 bg-light-900 flex flex-col justify-center items-center lg:hidden">
                        <div className="flex flex-col ">
                            <a href="/student" className="text-neutral-500 text-xl hover:underline">Sou Estudante</a>
                            <a href="/student" className="text-neutral-500 text-xl hover:underline">Sou Professor</a>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default Navbar;