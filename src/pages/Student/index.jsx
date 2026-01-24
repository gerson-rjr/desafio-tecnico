import Navbar from "../../components/NavBar"
import user1 from "../../assets/user1.png"
import StudentCard from "../../components/PeopleCard"
import useToggleList from "../../hooks/useToggleList"
import { students } from "../../store"
import { Medal } from "lucide-react"
import DownloadButton from "../../components/DownloadButton"
import PeopleCard from "../../components/PeopleCard"




export default function Student() {

    const { visible, toggle } = useToggleList();

    return (
        <>
            <Navbar />
            <div className="mx-auto pt-10 px-50">
                <div className="flex max-w-7x1 mx-auto p-10 justify-between items-center">
                    <PeopleCard image={user1} people="Lúcio Freitas" generalInfo="Estudante, 16 anos" state="Maceió/AL" />
                    <div>
                        <div className="p-10 items-center">
                            <button className="cursor-pointer" onClick={toggle}>
                                {visible ? "Ver Eventos/Modalidades" : "Ver Eventos/Modalidades"}
                            </button>
                            <br />
                            <button>
                                Alterar Informações
                            </button>
                        </div>
                    </div>

                </div>

                <div>
                    {visible && (
                        <>
                            <div className="border-t-1 border-sky-700" />
                            <ul className="flex">
                                <li className="flex-8 text text-center">Nome do Evento</li>
                                <li className="flex-2 text-center">Avaliação</li>
                                <li className="flex-2 text-center">Medalha</li>
                                <li className="flex-2 text-center">Certificado</li>
                            </ul>
                            {students.map((student, index) => (
                                <ul key={index}>
                                    {student.events.map((evnt, index) => (
                                        <ul className="flex" key={index}>
                                            {evnt.isEvaluative ?
                                                <>
                                                    <li className="flex-8 text text-center">{evnt.eventName}</li>
                                                    <li className="flex-2 text text-center">{evnt.grade}/100</li>
                                                    {evnt.medal == 1 ? (
                                                        <>

                                                            <li className="flex-2 text-center ">
                                                                <Medal className=" text-amber-400 items-center" />
                                                            </li>
                                                        </>
                                                    ) : ""

                                                    }
                                                    {evnt.medal == 2 ? (
                                                        <>
                                                            <li className="flex-2 text-center">
                                                                <Medal className="text-gray-300 items-center" />
                                                            </li>
                                                        </>
                                                    ) : ""

                                                    }
                                                    {evnt.medal == 3 ? (
                                                        <>
                                                            <li className="bg-red-200 flex-2 text text-center">
                                                                <Medal className="text-amber-900 items-center" />
                                                            </li>
                                                        </>
                                                    ) : ""

                                                    }
                                                    <li className="flex-2 text text-center">
                                                        <DownloadButton file={evnt.certificate} name={`${evnt.eventName}.pdf`} />
                                                    </li>
                                                </>

                                                :
                                                (
                                                    <>
                                                        <li className="flex-8 text text-center">
                                                            {evnt.eventName}
                                                        </li>
                                                        <li className="flex-2 text text-center">
                                                            -
                                                        </li>
                                                        <li className="flex-2 text text-center">
                                                            -
                                                        </li>
                                                        <li className="flex-2 text text-center">
                                                            -
                                                        </li>
                                                    </>
                                                )}
                                        </ul>
                                    ))}
                                </ul>
                            ))}

                        </>
                    )}
                </div>
            </div>
        </>
    )
}
