import video1 from "../assets/video1.mp4"
import video2 from "../assets/video2.mp4"

const HeroSection = () => {
    return (
        <>
            <h1 className="text text-gray-700 -4xl sm:text-6 lg:text-7xl text-center tracking-wide">
                Participe, Colabore ou Gerencie
                <span className="bg-gradient-to-r from-sky-400 to-yellow-300 text-transparent bg-clip-text" >
                    {" "}Olimpíadas & Eventos Científicos
                </span>
            </h1>
            <div className="flex mt-10 justify-center">
                <video autoPlay loop muted className="rounded-lg w-1/2 border border-sky-700 mx-2 my-4">
                    <source src={video1} type="video/mp4" />
                    Your browse does not support video tag.
                </video>
                <video autoPlay loop muted className="rounded-lg w-1/2 border border-sky-700 mx-2 my-4">
                    <source src={video2} type="video/mp4" />
                    Your browse does not support video tag.
                </video>
            </div>
            <div className="flex justify-center my-10">
                <a href="/teacher" className="text text-sky-700 py-3 px-4 mx-3 rounded-md border border-sky-700">
                    Sou Professor
                </a>
                <a href="/student" className="text text-sky-700 py-3 px-4 mx-3 rounded-md border border-sky-700">
                    Sou Estudante
                </a>
            </div>
        </>
    )
}

export default HeroSection