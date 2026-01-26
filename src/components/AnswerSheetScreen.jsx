import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export default function AnswerSheetScreen() {
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detectedAnswers, setDetectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [setStudents] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [editing, setEditing] = useState(false);

  const inputRef = useRef();
  const answerInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setFiles(selectedFiles);
    setCurrentIndex(0);
    setDetectedAnswers({});
    setCurrentQuestionIndex(0);
  };

  const preprocessImage = (file) =>
    new Promise((resolve) => {
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
          const gray =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          const value = gray > 180 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas);
      };

      img.src = URL.createObjectURL(file);
    });

  const handleProcess = async () => {
    if (!files[currentIndex] || !studentName.trim()) return;

    setLoading(true);
    setProgress(0);
    setDetectedAnswers({});
    setCurrentQuestionIndex(0);
    setEditing(false);

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
          answers[`Questão ${index + 1}`] = {
            ocrValue: letter.toUpperCase(),
            finalValue: letter.toUpperCase(),
            source: "ocr",
          };
        });
      }

      setDetectedAnswers(answers);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

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
    setEditing(false);

    if (currentIndex < files.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const entries = Object.entries(detectedAnswers);
  const current = entries[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-neutral-200 p-6">
      <h2 className="text-3xl font-bold text-sky-950 text-center mb-8">
        CORREÇÃO AUTOMÁTICA OBR TEÓRICA
      </h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-sky-950"
        />
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => inputRef.current.click()}
          className="px-6 py-3 bg-sky-950 text-white rounded-lg"
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

      {files[currentIndex] && (
        <div className="text-center mb-6">
          <p className="mb-2 font-medium">{files[currentIndex].name}</p>
          <button
            onClick={handleProcess}
            disabled={loading || !studentName.trim()}
            className="px-5 py-2 bg-sky-950 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Processando..." : "Detectar Respostas"}
          </button>
        </div>
      )}

      {loading && (
        <div className="mb-6">
          <p>Progresso: {progress}%</p>
          <div className="w-full bg-neutral-300 h-3 rounded">
            <div
              className="bg-sky-950 h-3 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {current && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
          <p className="text-sm mb-2">
            Questão {currentQuestionIndex + 1} de {entries.length}
          </p>

          <div
            className={`p-5 rounded-xl border ${current[1].source === "manual"
              ? "bg-sky-50 border-sky-400"
              : "bg-emerald-50 border-emerald-400"
              }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{current[0]}</span>

              <input
                ref={answerInputRef}
                disabled={!editing}
                maxLength={1}
                value={current[1].finalValue}
                onChange={(e) => {
                  const value = e.target.value
                    .toUpperCase()
                    .replace(/[^A-E]/g, "");

                  setDetectedAnswers((prev) => ({
                    ...prev,
                    [current[0]]: {
                      ...prev[current[0]],
                      finalValue: value,
                      source:
                        value !== prev[current[0]].ocrValue
                          ? "manual"
                          : "ocr",
                    },
                  }));
                }}
                className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg"
              />
            </div>

            <p className="mt-2 text-sm">
              {current[1].source === "manual"
                ? "Resposta ajustada manualmente"
                : "Resposta detectada automaticamente"}
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setEditing(false);
                setCurrentQuestionIndex((i) =>
                  Math.min(i + 1, entries.length - 1)
                );
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg"
            >
              Salvar resposta
            </button>

            <button
              onClick={() => {
                setEditing(true);

                // pequeno delay para garantir que o input seja habilitado
                setTimeout(() => {
                  answerInputRef.current?.focus();
                }, 0);
              }}
              className="px-6 py-2 bg-sky-950 text-white rounded-lg"
            >
              Alterar resposta
            </button>
          </div>

          {currentQuestionIndex === entries.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={handleConfirmStudent}
                className="px-8 py-3 bg-emerald-700 text-white rounded-xl"
              >
                Confirmar todas as respostas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
