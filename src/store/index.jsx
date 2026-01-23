import certificate1 from "../assets/certificate1.pdf"
import certificate2 from "../assets/certificate2.pdf"
import certificate3 from "../assets/certificate3.pdf"
import user1 from "../assets/user1.png"

export const students = [
    {
        name: "Lucio Freitas",
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
    }

]