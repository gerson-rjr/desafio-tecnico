import Navbar from "../../components/NavBar"
import user2 from "../../assets/user2.png"
import PeopleCard from "../../components/PeopleCard"
import useToggleList from "../../hooks/useToggleList"
import { students, teacherEvents } from "../../store"
import { useState } from "react"
import { useStudentSearch } from "../../hooks/useStudentSearch"
import JSZip from 'jszip'

async function downloadCertificatesZip(students) {
    const zip = new JSZip()
    const folder = zip.folder('certificados')

    for (const student of students) {
        for (const event of student.events) {
            if (event.certificate) {
                const response = await fetch(event.certificate)
                const blob = await response.blob()
                folder.file(
                    `${student.name} - ${event.title}.pdf`,
                    blob
                )
            }
        }
    }
    const content = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(content)
    link.download = 'certificados.zip'
    link.click()
}

const Teacher = () => {
    const { visible, toggle } = useToggleList();
    const [search, setSearch] = useState('')

    const filteredStudents = useStudentSearch(students, search)

    return (
        <div className="min-h-screen bg-neutral-200">
            {/* Navbar */}
            <header className="bg-sky-950">
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

                {/* Topo: perfil + ações */}
                <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Card da pessoa */}
                    <PeopleCard
                        image={user2}
                        people="Ana Maria"
                        generalInfo="Coordenadora de Projeto"
                        state="Maceió/AL"
                    />

                    {/* Ações */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
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

                        <button
                            onClick={() => downloadCertificatesZip(students)}
                            className="px-4 py-2 rounded-lg bg-sky-950 text-white hover:bg-sky-900 transition"
                        >
                            DOWNLOAD CERTIFICADOS
                        </button>

                        <input
                            type="text"
                            className="px-4 py-2 rounded-lg border border-neutral-400 text-center placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-950"
                            placeholder="BUSCAR ALUNO"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </section>

                {/* Resultado da busca */}
                {search && (
                    <section className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold text-sky-950 mb-4">
                            Alunos encontrados
                        </h2>

                        {filteredStudents.length === 0 ? (
                            <p className="text-neutral-500">Nenhum aluno encontrado.</p>
                        ) : (
                            <ul className="divide-y">
                                {filteredStudents.map(student => (
                                    <li
                                        key={student.id}
                                        className="py-2 text-sky-950"
                                    >
                                        {student.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}

                {/* Eventos e modalidades */}
                {visible && (
                    <section className="bg-white rounded-xl shadow overflow-hidden">

                        {/* Cabeçalho (desktop) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 bg-neutral-100 px-6 py-4 font-semibold text-sky-950">
                            <div className="col-span-6 text-center">EVENTOS E MODALIDADES</div>
                            <div className="col-span-3 text-center">ALUNOS</div>
                            <div className="col-span-3 text-center">AÇÕES</div>
                        </div>

                        {/* Lista */}
                        <ul className="divide-y">
                            {teacherEvents.map((evnt, index) => (
                                <li
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center"
                                >
                                    <div className="md:col-span-6 text-center md:text-left font-medium text-sky-950">
                                        {evnt.eventName}
                                    </div>

                                    <div className="md:col-span-3 text-center text-neutral-700">
                                        {evnt.studentsSubscribed.length}
                                    </div>

                                    <div className="md:col-span-3 flex gap-2 justify-center">
                                        <button className="px-3 py-1 rounded-md border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white transition">
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
            </main>
        </div>
    )
}

export default Teacher