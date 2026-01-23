import Navbar from "../../components/NavBar"
import user2 from "../../assets/user2.png"
import PeopleCard from "../../components/PeopleCard"
import useToggleList from "../../hooks/useToggleList"
import { teacherEvents } from "../../store"

const Teacher = () => {
    const { visible, toggle } = useToggleList();
    const { studentVisible, toggleStudents} = useToggleList();
    return (
        <>
            <>
                <Navbar />
                <div className="mx-auto pt-10 px-50 ">
                    <div className="flex  max-w-7x1 mx-auto p-10 justify-between items-center">
                        <PeopleCard image={user2} student="Ana Maria" generalInfo="Coordenadora de Projeto" state="Maceió/AL" />
                        <div>
                            <div className="p-10 items-center">
                                <button className="cursor-pointer p-2 border-l-1 border-r-1" onClick={toggle}>
                                    {visible ? "Lista de Eventos/Modalidade" : "Lista de Eventos/Modalidades"}
                                </button>
                                <button className="cursor-pointer p-2  border-r-1">
                                     Alterar Informações 
                                </button>
                                <button className="cursor-pointer p-2  border-r-1">
                                     Download de Certificados 
                                </button>
                                <input type="text" className="p-2 text-center border-r-1" placeholder="Procurar um aluno" />
                            </div>
                        </div>

                    </div>

                    <div>
                        {visible && (
                            <>

                                <div className="border-t-1 border-sky-700" />
                                <ul className="flex">
                                    <li className="flex-8 text text-center">Nome do Evento</li>
                                    <li className="flex-4 text-center">Quantidade de Alunos</li>
                                    <li className="flex-4 text-center">Ver Alunos</li>
                                </ul>
                                {teacherEvents.map((evnt, index) => (
                                    <ul key={index}>
                                            <ul className="flex" key={index}>
                                                    <>
                                                        <li className="flex-8 text text-center">{evnt.eventName}</li>
                                                        <li className="flex-4 text text-center">{evnt.studentsSubscribed.length}</li>
                                                        <button onClick={toggleStudents} className="cursor-pointer flex-4 text text-center">
                                                            {studentVisible ? "" : "Mostrar"}
                                                            {studentVisible && (
                                                                <>
                                                                    {evnt.studentsSubscribed.map((subs, index) => (
                                                                        <ul key={index}>
                                                                            <li>{subs.studentAge}</li>
                                                                        </ul>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </button>
                                                    </>
                                            </ul>
                                    </ul>
                                ))}

                            </>
                        )}
                    </div>
                </div>
            </>
        </>
    )
}

export default Teacher