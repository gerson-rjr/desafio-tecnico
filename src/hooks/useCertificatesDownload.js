import { useState, useMemo } from 'react'
import JSZip from 'jszip'

export function useCertificatesDownload(students = []) {
  const [selectedCertificates, setSelectedCertificates] = useState([])

  // 🔹 Extrai todos os certificados válidos
  const allCertificates = useMemo(() => {
    return students.flatMap(student =>
      student.events
        .filter(ev => ev.isEvaluative && ev.certificate)
        .map(ev => ({
          studentName: student.name,
          eventName: ev.eventName,
          certificate: ev.certificate
        }))
    )
  }, [students])

  function addCertificate(certificate){
    setSelectedCertificates((prev) => [...prev, certificate])
  }

  function toggleSelected(cert) {
    setSelectedCertificates(prev =>
      prev.some(item => item.certificate === cert.certificate)
        ? prev.filter(item => item.certificate !== cert.certificate)
        : [...prev, cert]
    )
  }

  function selectAll() {
    setSelectedCertificates(allCertificates)
  }

  function clearSelection() {
    setSelectedCertificates([])
  }

  async function downloadZip() {
    if (selectedCertificates.length === 0) return

    const zip = new JSZip()

    for (const cert of selectedCertificates) {
      const response = await fetch(cert.certificate)
      const blob = await response.blob()

      zip.file(
        `${cert.studentName}/${cert.eventName}.pdf`,
        blob
      )
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(content)
    link.download = 'certificados.zip'
    link.click()
  }

  return {
    allCertificates,
    selectedCertificates,
    toggleSelected,
    addCertificate,
    selectAll,
    clearSelection,
    downloadZip
  }
}