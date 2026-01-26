import Navbar from "../../components/NavBar"
import user2 from "../../assets/user2.png"
import PeopleCard from "../../components/PeopleCard"
import useToggleList from "../../hooks/useToggleList"
import { students, teacherEvents } from "../../store"
import { useState } from "react"
import { useStudentSearch } from "../../hooks/useStudentSearch"
import { useCertificatesDownload } from "../../hooks/useCertificatesDownload"
import Modal from "../../components/Modal"

const Teacher = () => {
    const { visible, toggle } = useToggleList()
    const [search, setSearch] = useState("")
    const filteredStudents = useStudentSearch(students, search)

    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
    const [studentToView, setStudentToView] = useState(null)


    const {
        selectedCertificates,
        loading,
        addCertificate,
        selectAll,
        clearSelection,
        downloadZip,
    } = useCertificatesDownload(students)

    return (
        <div className="min-h-screen bg-neutral-200">
            <header className="bg-sky-950">
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
                <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>

                        <PeopleCard
                            image={user2}
                            people="Ana Maria"
                            generalInfo="Coordenadora de Projeto"
                            state="Maceió/AL"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <button
                            onClick={toggle}
                            className="px-4 py-2 rounded-lg border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition"
                        >
                            EVENTOS E MODALIDADES
                        </button>

                        <button className="px-4 py-2 rounded-lg border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition">
                            ALTERAR INFORMAÇÕES
                        </button>

                        <button
                            onClick={() => setIsDownloadModalOpen(true)}
                            className="px-4 py-2 rounded-lg border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition"
                        >
                            DOWNLOAD CERTIFICADOS
                        </button>
                        <a href="/proof-correction" className="px-4 text-center py-2 rounded-lg border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition">
                            CORREÇÃO OBR TEÓRICA
                        </a>

                        <input
                            type="text"
                            className="px-4 py-2 rounded-lg border border-neutral-400 text-center placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-950"
                            placeholder="BUSCAR ALUNO"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </section>
                {search && (
                    <section className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold text-sky-950 mb-4">
                            Alunos encontrados
                        </h2>
                        {filteredStudents.length === 0 ? (
                            <p className="text-neutral-500">Nenhum aluno encontrado.</p>
                        ) : (
                            <ul className="divide-y">
                                {filteredStudents.map((student) => (
                                    <li key={student.id} className="py-2 text-sky-950">
                                        {student.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}
                {visible && (
                    <section className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 bg-neutral-100 px-6 py-4 font-semibold text-sky-950">
                            <div className="col-span-6 text-center">EVENTOS E MODALIDADES</div>
                            <div className="col-span-3 text-center">ALUNOS</div>
                            <div className="col-span-3 text-center">AÇÕES</div>
                        </div>

                        <ul className="divide-y">
                            {teacherEvents.map((event, index) => (
                                <li
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center"
                                >
                                    <div className="md:col-span-6 text-center md:text-left font-medium text-sky-950">
                                        {event.eventName}
                                    </div>

                                    <div className="md:col-span-3 text-center text-neutral-700">
                                        {event.studentsSubscribed.length}
                                    </div>

                                    <div className="md:col-span-3 flex gap-2 justify-center">
                                        <button
                                            className="px-3 py-1 rounded-md border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition"
                                            onClick={() => {
                                                setStudentToView({
                                                    name: event.eventName,
                                                    students: event.studentsSubscribed,
                                                })
                                                setIsStudentModalOpen(true)
                                            }}
                                        >
                                            VER
                                        </button>

                                        <button className="px-3 py-1 rounded-md bg-sky-950 text-white hover:bg-sky-900 transition">
                                            INSERIR
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <Modal
                    isOpen={isDownloadModalOpen}
                    onClose={() => setIsDownloadModalOpen(false)}
                >
                    <h2 className="text-xl font-bold mb-4">Download de Certificados</h2>

                    <ul className="space-y-3 max-h-96 overflow-y-auto">
                        {students.map((student) => (
                            <li
                                key={student.id}
                                className="border p-3 rounded-lg space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-neutral-500">{student.age} anos</p>
                                    </div>
                                </div>

                                <ul className="pl-6 space-y-1">
                                    {student.events
                                        .filter((event) => event.isEvaluative)
                                        .map((event, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{event.eventName}</span>
                                                <input
                                                    type="checkbox"

                                                    onChange={() =>
                                                        addCertificate({
                                                            studentName: student.name,
                                                            studentAge: student.age,
                                                            eventName: event.eventName,
                                                            certificate: event.certificate,
                                                        })
                                                    }
                                                />
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={selectAll}
                            className="flex-1 border rounded-lg py-2"
                        >
                            Selecionar todos certificados
                        </button>

                        <button
                            onClick={downloadZip}
                            disabled={loading || selectedCertificates.length === 0}
                            className="flex-1 bg-sky-950 text-white rounded-lg py-2"
                        >
                            {loading ? "Gerando ZIP..." : `Baixar (${selectedCertificates.length})`}
                        </button>

                        <button
                            onClick={clearSelection}
                            className="flex-1 border rounded-lg py-2"
                        >
                            Limpar seleção
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={isStudentModalOpen}
                    onClose={() => setIsStudentModalOpen(false)}
                >
                    {studentToView && (
                        <>
                            <h2 className="text-xl font-bold mb-4">{studentToView.eventName}</h2>

                            <ul className="space-y-2 max-h-96 overflow-y-auto">
                                {studentToView.students.map((student) => (
                                    <li
                                        key={student.id}
                                        className="border p-2 rounded-md flex justify-between"
                                    >
                                        <span>{student.studentName}</span>
                                        <span className="text-neutral-500">{student.studentAge} anos</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Modal>
            </main>
        </div>
    )
}

export default Teacher