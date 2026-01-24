import certificate1 from "../assets/certificate1.pdf"
import certificate2 from "../assets/certificate2.pdf"
import certificate3 from "../assets/certificate3.pdf"
import user1 from "../assets/user1.png"
import user2 from "../assets/user2.png"

export const students = [
    {
        id: 1,
        name: "Lucio Freitas",
        email: "lucioffreitas@hotmail.com",
        events: [
            {
                id: 1,
                eventName: "Olimpíada Brasileira de Robótica Teórica",
                isEvaluative: true,
                medal: 1,
                grade: 100,
                certificate: certificate1,
            },
            {
                id: 2,
                eventName: "Olimpíada Brasileira de Robótica Prática",
                isEvaluative: true,
                medal: 3,
                grade: 78,
                certificate: certificate2,
            },
            {
                id: 3,
                eventName: "CBR Soccer",
                isEvaluative: true,
                medal: 2,
                grade: 92,
                certificate: certificate3,
            },
            {
                id: 4,
                eventName: "Mostra Nacional de Robótica",
                isEvaluative: false,
            },
        ],
        image: user1,
    },

    {
        id: 2,
        name: "Ana Farias",
        email: "anafarias@gmail.com",
        events: [
            {
                id: 1,
                eventName: "Olimpíada Brasileira de Robótica Teórica",
                isEvaluative: true,
                medal: 1,
                grade: 100,
                certificate: certificate1,
            },
            {
                id: 2,
                eventName: "Olimpíada Brasileira de Robótica Prática",
                isEvaluative: true,
                medal: 3,
                grade: 78,
                certificate: certificate2,
            },
            {
                id: 3,
                eventName: "CBR Soccer",
                isEvaluative: true,
                medal: 2,
                grade: 92,
                certificate: certificate3,
            },
            {
                id: 4,
                eventName: "Mostra Nacional de Robótica",
                isEvaluative: false,
            },
        ],
        image: user1,
    },


]




export const teacherEvents = [
    {
        id: 1,
        eventName: "Olimpíada Brasileira de Robótica Teórica",
        studentsSubscribed: [
            { id: 1, studentName: "Lucio Freitas", studentAge: "16", certificate: certificate1 },
            { id: 2, studentName: "Joana Darc", studentAge: "15", certificate: certificate2 },
            { id: 3, studentName: "Paulo Farias", studentAge: "14", certificate: certificate3 },
            { id: 4, studentName: "Joice Batista", studentAge: "14", certificate: certificate1 },
        ]
    },
    {
        id: 2,
        eventName: "Mostra Nacional de Robótica - Mundial",
        studentsSubscribed: [
            { id: 1, studentName: "Luciano Lima", studentAge: "17", certificate: certificate2 },
            { id: 2, studentName: "João Pedro", studentAge: "15", certificate: certificate3 },
            { id: 3, studentName: "Cida Costa", studentAge: "14", certificate: certificate1 },
            { id: 4, studentName: "Lauren de Sousa", studentAge: "15", certificate: certificate2},
        ]
    }

]