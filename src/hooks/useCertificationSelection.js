import { useState } from 'react'
import JSZip from 'jszip'

export function useCertificateSelection(students = []) {
  const [selectedCertificates, setSelectedCertificates] = useState([])
  const [loading, setLoading] = useState(false)

  // Garante que só usamos o primeiro aluno
  const student = students[0]
  const events = student?.events || []

  // Toggle individual
  function toggleCertificate(event) {
    if (!event?.certificate) return

    setSelectedCertificates(prev => {
      const exists = prev.some(
        item => item.certificate === event.certificate
      )

      if (exists) {
        return prev.filter(
          item => item.certificate !== event.certificate
        )
      }

      return [
        ...prev,
        {
          eventName: event.eventName,
          certificate: event.certificate
        }
      ]
    })
  }

  // Seleciona todos os certificados DO PRIMEIRO ALUNO
  function selectAll() {
    const allCertificates = events
      .filter(evnt => evnt.isEvaluative && evnt.certificate)
      .map(evnt => ({
        eventName: evnt.eventName,
        certificate: evnt.certificate
      }))

    setSelectedCertificates(allCertificates)
  }

  // Limpa seleção
  function clearSelection() {
    setSelectedCertificates([])
  }

  // Download ZIP (somente do primeiro aluno)
  async function downloadZip() {
    if (selectedCertificates.length === 0) return

    setLoading(true)

    try {
      const zip = new JSZip()
      const folder = zip.folder('certificados')

      for (const cert of selectedCertificates) {
        const response = await fetch(cert.certificate)
        const blob = await response.blob()
        folder.file(`${cert.eventName}.pdf`, blob)
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' })

      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
      link.download = `${student?.name || 'certificados'}.zip`
      link.click()
    } finally {
      setLoading(false)
    }
  }

  return {
    student,
    events,
    selectedCertificates,
    loading,
    toggleCertificate,
    selectAll,
    clearSelection,
    downloadZip
  }
}