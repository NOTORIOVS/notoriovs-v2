import Image from 'next/image';
import LogoSymbol from '../../../../public/images/svg/NTRS-Logo-Symbol.svg';
import Logotype from '../../../../public/images/NT-Logotype.svg';
import PrintButton from '@/components/print-button';
import '@/styles/receipt.scss';
import { headers } from 'next/headers';

const getData = (id) => {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  const baseUrl = `${protocol}://${host}`;

  return fetch(`${baseUrl}/api/receipt?id=${id}`, {method: 'POST'})
    .then(response => response.json())
    .then(res => res)
    .catch(err => console.error('ERROR', err));
};

export async function generateMetadata({params}) {
  const {id} = params;
  const data = await getData(id);

  return {
    title: `NotoriovsReceipt_${data.ref_code}`,
  };
}

export default async function Receipt({params}) {
  const {id} = params;
  const data = await getData(id);

  const {
    type,
    due_date: dueDate,
    issue_date: issueDate,
    acct_number: accountNumber,
    bank_name: bank,
    clabe,
    brand,
    client,
    formatted_amount: amount,
    concept,
    ref_code: refCode,
    fiscal,
    vat,
    retISR,
    total_amount_due: totalAmountDue,
    status,
    status_text: statusText,
  } = data;

  const {bankAccount: _, ...stampData} = data;

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        <div className="w-full px-8 md:px-40 print:px-20 flex-grow mono border-b">
          <div className="flex flex-col md:flex-row print:flex-row border-b py-20">
            <div
              className="w-1/3 mb-12 md:mb-0 print:mb-0 md:w-1/6 print:w-1/6 relative mx-auto flex flex-col justify-center items-center">
              <Image src={LogoSymbol} alt="Logo" className="w-2/3 mb-6"/>
              <Image src={Logotype} alt="Logo" className="w-full"/>
            </div>
            <div
              className="flex-grow flex justify-center md:justify-end print:justify-end md:items-end print:items-end">
              <p className="text-center md:text-right print:text-right -ft-2">Notoriovs Studio<br/>
                Montreal 1071, Providencia 2a Secc.<br/>
                Guadalajara, Jal.<br/>
                +52 (33) 1790 4027
              </p>
            </div>
          </div>
          <div>
            <p className="ft-2 uppercase font-bold">{type}</p>
          </div>
          <div className="py-16 grid grid-cols-2">
            <p className="text-left">Fecha de emisión:</p>
            <p className="text-right">{issueDate}</p>
            <p className="text-left">Fecha límite pago:</p>
            <p className="text-right">{dueDate}</p>
            <p className="text-left">Cliente:</p>
            <p className="text-right">{client}</p>
            <p className="text-left">Marca:</p>
            <p className="text-right">{brand}</p>
            <p className="text-left">Referencia:</p>
            <p className="text-right uppercase">{refCode}</p>
          </div>
          <div className="grid pb-8 grid-cols-2 border-dashed border-b-2 border-black">
            <p className="font-bold text-left uppercase italic">Concepto</p>
            <p className="font-bold text-right uppercase italic">Monto</p>
          </div>
          <div className="py-12 grid grid-cols-2 border-dashed border-b-2 border-black">
            <p className="text-left">{concept}</p>
            <p className="text-right">{amount}</p>
          </div>
          <div className="py-12 grid grid-cols-2">
            <p className="text-left">IVA:</p>
            <p className="text-right">{vat}</p>
            {retISR !== 'N/A' &&
              <>
                <p className="text-left">Retención ISR:</p>
                <p className="text-right">— {retISR}</p>
              </>
            }
            <p className="text-left font-bold">Total a pagar:</p>
            <p className="text-right font-bold">{totalAmountDue}</p>
          </div>
          <div className="py-12 border-t-2 border-b-2 border-black">
            <p className="ft-2 text-center uppercase font-bold">{statusText}</p>
            {fiscal ?
              <p className="text-center -ft-2">
                Este no es un comprobante fiscal.<br/>
                Favor de solicitar su factura.
              </p>
              : <p className="text-center -ft-2">Este no es un comprobante fiscal</p>
            }
          </div>
          {status !== 'Paid' &&
            <div className="py-12">
              <p className="font-bold uppercase italic">Cuenta de depósito</p>
              <p><span className="font-bold">BANCO:</span> {bank}</p>
              <p><span className="font-bold">CUENTA:</span> {accountNumber}</p>
              <p><span className="font-bold">CLABE:</span> {clabe}</p>
            </div>
          }
          <PrintButton/>
        </div>
        <div className="p-8 md:p-20 print:px-20">
          <p className="-ft-3">{id}</p>
          <p className="-ft-4 break-words hidden print:block">{encodeURI(JSON.stringify(stampData))}</p>
        </div>
      </div>
    </>
  );
}