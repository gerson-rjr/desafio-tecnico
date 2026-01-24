import AnswerSheetScreen from "../../components/AnswerSheetScreen";
import Navbar from "../../components/NavBar";


const ProofCorrection = () => {
    return (
        <div className="min-h-screen bg-neutral-200">
            <header className="bg-sky-950">
                <Navbar />
            </header>
            
            <AnswerSheetScreen />
        </div>
    )
}

export default ProofCorrection