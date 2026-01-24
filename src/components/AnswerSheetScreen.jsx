import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export default function AnswerSheetScreen() {
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detectedAnswers, setDetectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);

  const inputRef = useRef();

  /* =========================
     Upload múltiplo
  ========================= */
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);
    setCurrentIndex(0);
    setDetectedAnswers({});
  };

  /* =========================
     Pré-processamento
  ========================= */
  const preprocessImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          const value = gray > 180 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  /* =========================
     OCR
  ========================= */
  const handleProcess = async () => {
    if (!files[currentIndex] || !studentName.trim()) return;

    setLoading(true);
    setProgress(0);
    setDetectedAnswers({});

    try {
      const canvas = await preprocessImage(files[currentIndex]);

      const { data } = await Tesseract.recognize(canvas, "por", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
        tessedit_pageseg_mode: 6,
      });

      const answers = {};
      const matches = data.text.match(/[A-E]/gi);

      if (matches) {
        matches.forEach((letter, index) => {
          answers[`Q${index + 1}`] = letter.toUpperCase();
        });
      }

      setDetectedAnswers(answers);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  /* =========================
     Confirmar correção
  ========================= */
  const handleConfirmStudent = () => {
    setStudents((prev) => [
      ...prev,
      {
        name: studentName,
        file: files[currentIndex].name,
        answers: detectedAnswers,
      },
    ]);

    setDetectedAnswers({});
    setStudentName("");
    setProgress(0);

    if (currentIndex < files.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 p-6">
      <h2 className="text-3xl font-bold text-sky-950 text-center mb-8">
        Correção de Provas
      </h2>

      {/* Nome do aluno */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-400 focus:ring-2 focus:ring-sky-950"
        />
      </div>

      {/* Upload */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => inputRef.current.click()}
          className="px-6 py-3 bg-sky-950 text-white rounded-lg shadow hover:bg-sky-900"
        >
          Selecionar Imagens
        </button>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          hidden
        />
      </div>

      {/* Processar */}
      {files[currentIndex] && (
        <div className="text-center mb-6">
          <p className="font-medium text-sky-950 mb-2">
            {files[currentIndex].name}
          </p>
          <button
            onClick={handleProcess}
            disabled={loading || !studentName.trim()}
            className="px-5 py-2 bg-sky-950 text-white rounded-lg hover:bg-sky-900 disabled:opacity-50"
          >
            {loading ? "Processando..." : "Detectar Respostas"}
          </button>
        </div>
      )}

      {/* Progresso */}
      {loading && (
        <div className="mb-6">
          <p className="text-sky-950 mb-1">Progresso: {progress}%</p>
          <div className="w-full bg-neutral-300 h-3 rounded">
            <div
              className="bg-sky-950 h-3 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Correção manual */}
      {Object.keys(detectedAnswers).length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-xl font-semibold text-sky-950 mb-4">
            Corrigir Respostas
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.entries(detectedAnswers).map(([question, answer]) => (
              <div
                key={question}
                className="flex justify-between items-center p-3 bg-sky-50 rounded-lg border"
              >
                <span className="font-medium">{question}</span>
                <input
                  type="text"
                  maxLength={1}
                  value={answer}
                  onChange={(e) =>
                    setDetectedAnswers({
                      ...detectedAnswers,
                      [question]: e.target.value
                        .toUpperCase()
                        .replace(/[^A-E]/g, ""),
                    })
                  }
                  className="w-10 text-center font-bold border rounded focus:ring-2 focus:ring-sky-950"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleConfirmStudent}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
          >
            Confirmar e Salvar Aluno
          </button>
        </div>
      )}

      {/* Alunos processados */}
      {students.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-sky-950 mb-4">
            Alunos Processados
          </h3>
          <ul className="space-y-2">
            {students.map((s, idx) => (
              <li
                key={idx}
                className="border p-3 rounded-md flex justify-between"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-neutral-500">
                  {Object.keys(s.answers).length} respostas
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}