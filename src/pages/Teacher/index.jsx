import Navbar from "../../components/NavBar"
import user2 from "../../assets/user2.png"
import PeopleCard from "../../components/PeopleCard"
import useToggleList from "../../hooks/useToggleList"
import { students, teacherEvents } from "../../store"
import { useState } from "react"
import { useStudentSearch } from "../../hooks/useStudentSearch"


const Teacher = () => {
    const { visible, toggle } = useToggleList();
    const [search, setSearch] = useState('')

    const filteredStudents = useStudentSearch(students, search)

    return (
        <>
            <div className="bg-neutral-200 h-screen">
                <div className="bg-neutral-950">
                    <Navbar />

                </div>
                <div className="pt-10">
                    <div className="flex justify-around items-center text-neutral-800 pt-10 pl-20">
                        <PeopleCard image={user2} people="Ana Maria" generalInfo="Coordenadora de Projeto" state="Maceió/AL" />
                        <div>
                            <div className="items-center">
                                <button className="cursor-pointer p-2 text-neutral-800 " onClick={toggle}>
                                    {visible ? "EVENTOS E MODALIDADES" : "EVENTOS E MODALIDADES"}
                                </button>
                                <button className="cursor-pointer p-2 text-neutral-800">
                                    ALTERAR INFORMAÇÕES
                                </button>
                                <a href="/certificates">
                                    DOWNLOAD DE CERTIFICADOS
                                </a>
                                <input type="text"
                                    className=" text-center placeholder-neutral-800"
                                    placeholder="BUSCAR ALUNO"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-10">
                    </div>
                    <div>
                        {search && (
                            <div className="flex flex-col p-20 ">
                                <span className="text-neutral-800 text-xl">Alunos Encontrados</span>
                                <ul>
                                    {filteredStudents.map(student => (
                                        <li key={student.id}>{student.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {visible && (
                            <>
                                <ul className="flex font-bold border-b-1 text-neutral-800 mx-auto px-8 text-xl text-neutral-800">
                                    <li className="flex-8 text text-center">EVENTOS E MODALIDADES</li>
                                    <li className="flex-4 text-center">QUANTIDADE DE ALUNOS</li>
                                    <li className="flex-4 text-center">VER/INSERIR ALUNOS</li>
                                </ul>
                                {teacherEvents.map((evnt, index) => (
                                    <ul key={index}>
                                        <ul className="flex text-xl p-10 text-neutral-800 border-b-1 items-center" key={index}>
                                            <>
                                                <li className="flex-8 text text-center">{evnt.eventName}</li>
                                                <li className="flex-4 text text-center">{evnt.studentsSubscribed.length}</li>
                                                <div className="flex flex-4 flex-col">

                                                    <button onClick={""} className="cursor-pointer flex-4 text text-center">
                                                        VER
                                                        {/* {studentVisible && (
                                                        <>
                                                            {evnt.studentsSubscribed.map((subs, index) => (
                                                                <ul key={index}>
                                                                    <li>{subs.studentAge}</li>
                                                                </ul>
                                                            ))}
                                                        </>
                                                    )} */}
                                                    </button>
                                                    <button onClick={""} className="cursor-pointer flex-4 text text-center">
                                                        INSERIR
                                                        {/* {studentVisible && (
                                                        <>
                                                            {evnt.studentsSubscribed.map((subs, index) => (
                                                                <ul key={index}>
                                                                    <li>{subs.studentAge}</li>
                                                                </ul>
                                                            ))}
                                                        </>
                                                    )} */}
                                                    </button>
                                                </div>
                                            </>
                                        </ul>
                                    </ul>
                                ))}

                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teacher