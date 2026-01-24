import Navbar from "../../components/NavBar"
import user1 from "../../assets/user1.png"
import useToggleList from "../../hooks/useToggleList"
import { students } from "../../store"
import { Medal } from "lucide-react"
import PeopleCard from "../../components/PeopleCard"
import { useCertificatesDownload } from "../../hooks/useCertificatesDownload"


export default function Student() {

    const { visible, toggle } = useToggleList();
    const {
        selectedCertificates,
        toggleSelected,
        selectAll,
        clearSelection,
        downloadZip
    } = useCertificatesDownload([students[0]])

    return (
        <div className="min-h-screen bg-neutral-200">
            <header className="bg-sky-950">
                <Navbar />
            </header>
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
                <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <PeopleCard
                        image={user1}
                        people={students[0].name}
                        email={students[0].email}
                        {...console.log(students[0])}
                        generalInfo={"Estudante, " + students[0].age + " anos"}
                        state={students[0].state}
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={toggle}
                            className="px-4 py-2 rounded-lg border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition"
                        >
                            EVENTOS E MODALIDADES
                        </button>

                        <button
                            className="px-4 py-2 rounded-lg border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition"
                        >
                            ALTERAR INFORMAÇÕES
                        </button>
                    </div>
                </section>
                {visible && (
                    <section className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 bg-neutral-100 px-6 py-4 font-semibold text-sky-950">
                            <div className="col-span-6 text-center">Evento</div>
                            <div className="col-span-2 text-center">Avaliação</div>
                            <div className="col-span-2 text-center">Medalha</div>
                            <div className="col-span-2 text-center">Certificado</div>
                        </div>

                        <ul className="divide-y">
                            {students[0].events.map((event, index) => (
                                <li
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center"
                                >
                                    <div className="md:col-span-6 text-center md:text-left font-medium text-sky-950">
                                        {event.eventName}
                                    </div>

                                    <div className="md:col-span-2 text-center text-neutral-700">
                                        {event.isEvaluative ? `${event.grade}/100` : '-'}
                                    </div>
                                    <div className="md:col-span-2 flex justify-center">
                                        {event.isEvaluative && event.medal === 1 && (
                                            <Medal className="text-amber-400" />
                                        )}
                                        {event.isEvaluative && event.medal === 2 && (
                                            <Medal className="text-gray-300" />
                                        )}
                                        {event.isEvaluative && event.medal === 3 && (
                                            <Medal className="text-amber-900" />
                                        )}
                                        {!event.isEvaluative && '-'}
                                    </div>
                                    <div className="md:col-span-2 flex items-center justify-center">
                                        {event.isEvaluative && (
                                            <input
                                                type="checkbox"
                                                checked={selectedCertificates.some(
                                                    item => item.certificate === event.certificate
                                                )}
                                                onChange={() => toggleSelected(event)}
                                                className="w-4 h-4  accent-sky-950 cursor-pointer"
                                            />
                                        )}

                                    </div>

                                </li>
                            ))
                            }
                        </ul>

                    </section>
                )}
                {visible && (
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => selectAll(students)}
                            className="px-4 py-2 rounded-lg border border-sky-950 text-sky-950"
                        >
                            Selecionar todos
                        </button>

                        <button
                            onClick={clearSelection}
                            disabled={selectedCertificates.length === 0}
                            className="px-4 py-2 rounded-lg border border-neutral-400 disabled:opacity-40"
                        >
                            Limpar
                        </button>

                        <button
                            onClick={downloadZip}
                            disabled={selectedCertificates.length === 0}
                            className="px-4 py-2 rounded-lg bg-sky-950 text-white disabled:opacity-40"
                        >
                            {`Baixar ZIP (${selectedCertificates.length})`}
                        </button>
                    </div>
                )}
            </main>
        </div>

    )
}
