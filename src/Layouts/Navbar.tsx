
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
    return (
        <nav className="w-full bg-[#1E1E1E] text-white p-4 flex justify-between items-center">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-xl font-bold">PWD Gen</h1>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-xl"><FaGithub /></a></li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar