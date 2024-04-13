'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import LogoSymbol from '../../../public/images/svg/NTRS-Logo-Symbol.svg';
import Logotype from '../../../public/images/NT-Logotype.svg';
import { useSearchParams } from 'next/navigation';

export default function Receipt() {
  const [borderWidth, setBorderWidth] = useState(45);
  const [borderHeight, setBorderHeight] = useState(22);
  const searchParams = useSearchParams();

  function formatDate(value = new Date, separator = '-', addedDays = 0) {
    let date = new Date(value);
    const day = (date.getDate() + addedDays).toLocaleString('es-MX', {day: '2-digit'});
    const month = date.toLocaleString('es-MX', {month: '2-digit'});
    const year = date.toLocaleString('es-MX', {year: 'numeric'});
    return year + separator + month + separator + day;
  }

  const formatCurr = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'MXN',
  });

  const date = new Date(parseInt(searchParams.get('date')));
  const client = searchParams.get('client');
  const concept = searchParams.get('concept');
  const amount = parseInt(searchParams.get('amount'));

  const receiptInfo = {
    id: searchParams.get('id'),
    issueDate: formatDate(date, '-'),
    dueDate: formatDate(date, '-', 7),
    client: client,
    refCode: formatDate(date, '') + '-' + client.replace(/[aeiou]/g, '').substring(0, 2) + '-' + concept.substring(0, 2),
    concept: searchParams.get('concept'),
    amount: () => {
      return formatCurr.format(amount);
    },
    vat: () => {
      if (searchParams.get('fiscal') === 'true') {
        return {
          value: formatCurr.format(amount * 0.16),
          totalDue: formatCurr.format(amount * 1.16),
        };
      }
      return {
        value: 'N/A',
        totalDue: formatCurr.format(amount),
      };
    },
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    const setArrowSizes = () => {
      setBorderWidth(body.offsetWidth / 24);
      setBorderHeight(body.offsetWidth / 48);
    };

    window.addEventListener('resize', setArrowSizes);
    return () => window.removeEventListener('resize', setArrowSizes);
  }, [borderWidth]);

  return (
    <div className="bg-gray-50 flex flex-col">
      <div className="flex">
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
        <div className="max-w-[9rem] w-1/12 h-0 border-t-black border-l-transparent border-r-transparent"
             style={{borderTopWidth: borderHeight, borderLeftWidth: borderWidth, borderRightWidth: borderWidth}}></div>
      </div>
      <div className="w-full px-8 md:px-40 flex-grow mono border-b">
        <div className="flex flex-col md:flex-row border-b py-20">
          <div className="w-1/3 mb-12 md:mb-0 md:w-1/6 relative mx-auto flex flex-col justify-center items-center">
            <Image src={LogoSymbol} alt="Logo" className="w-2/3 mb-6"/>
            <Image src={Logotype} alt="Logo" className="w-full"/>
          </div>
          <div className="flex-grow flex justify-center md:justify-end md:items-end">
            <p className="!leading-[1.5] text-center md:text-right">Bar code services S.A. de C.V.<br/>
              Montreal 1071, Providencia 2a Secc.<br/>
              Guadalajara, Jal.<br/>
              Tel: +52 33 1080 4567
            </p>
          </div>
        </div>
        <div className="py-20 grid grid-cols-2">
          <p className="!leading-[1.5] text-left">Fecha emisión:</p>
          <p className="!leading-[1.5] text-right">{receiptInfo.issueDate}</p>
          <p className="!leading-[1.5] text-left">Cliente:</p>
          <p className="!leading-[1.5] text-right">{receiptInfo.client}</p>
          <p className="!leading-[1.5] text-left">Referencia:</p>
          <p
            className="!leading-[1.5] text-right uppercase">{`PAY-${receiptInfo.refCode}`}</p>
        </div>
        <div className="grid pb-8 grid-cols-2 border-dashed border-b-2 border-black">
          <p className="!leading-[1.5] font-bold text-left uppercase italic">Concepto</p>
          <p className="!leading-[1.5] font-bold text-right uppercase italic">Monto</p>
        </div>
        <div className="py-12 grid grid-cols-2 border-dashed border-b-2 border-black">
          <p className="!leading-[1.5] text-left">{receiptInfo.concept}</p>
          <p className="!leading-[1.5] text-right">{receiptInfo.amount()}</p>
        </div>
        <div className="py-12 grid grid-cols-2">
          <p className="!leading-[1.5] text-left">IVA:</p>
          <p className="!leading-[1.5] text-right">{receiptInfo.vat().value}</p>
          <p className="!leading-[1.5] text-left">A pagar:</p>
          <p className="!leading-[1.5] text-right">{receiptInfo.vat().totalDue}</p>
          <p className="!leading-[1.5] text-left">Fecha límite pago:</p>
          <p className="!leading-[1.5] text-right">{receiptInfo.dueDate}</p>
        </div>
        <div className="py-12">
          <p className="!leading-[1.5] text-center">Gracias</p>
        </div>
      </div>
      <p className="-ft-3 p-8 md:p-20">{receiptInfo.id}</p>
    </div>
  );
}