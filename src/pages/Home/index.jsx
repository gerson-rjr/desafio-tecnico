import video1 from "../../assets/video1.mp4"
import Navbar from "../../components/NavBar";

const Home = () => {
    return (
        <>

            <Navbar></Navbar>

            <video src={video1} loop autoPlay muted className="object-cover absolute h-screen w-screen -z-10 top-0 left-0"></video>
            <div className="w-screen p-35" />
            <div className="w-screen pl-40 text-6xl font-bold text-neutral-200">
                <span className="">Participe de Olimpíadas e Eventos Científicos</span>
            </div>
            <div className="w-screen pl-40 text-3xl text-neutral-200">
                <span className="">Conecte-se ao conhecimento e faça parte do que transforma o futuro.</span>
            </div>
        </>
    )
}

export default Home