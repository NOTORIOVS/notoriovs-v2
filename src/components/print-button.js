"use client"

export default function PrintButton() {
  const handlePrint = () => typeof window !== 'undefined' && window.print();
  return <button className="mx-auto print:hidden" onClick={() => handlePrint()}>Imprimir / Descargar</button>
}