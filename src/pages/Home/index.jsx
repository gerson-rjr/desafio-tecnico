import NavBar from "../../components/NavBar"
import HeroSection from "../../components/HeroSection"

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="max-w-7xl mx-auto pt-20 px-6">
            <HeroSection />
            </div>
        </>
    )
}

export default Home