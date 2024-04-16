import { formatCurr, formatDate } from '@/utils/formatters';
import Image from 'next/image';
import LogoSymbol from '../../../public/images/svg/NTRS-Logo-Symbol.svg';
import Logotype from '../../../public/images/NT-Logotype.svg';
import { redirect } from 'next/navigation';
import { notion } from '@/services/notion';

async function getData(id) {
  try {
    const ticket = await notion.pages.retrieve({page_id: id});
    const project = await notion.pages.retrieve({page_id: ticket.properties.Project.relation[0].id});
    const type = await notion.pages.retrieve({page_id: ticket.properties['bank account'].relation[0].id});

    const data = {
      issueDate: ticket.properties.date.date.start,
      brand: ticket.properties.v_brand.formula.string,
      project: project.properties.Name.title[0].plain_text,
      amount: ticket.properties.amount.number,
      concept: ticket.properties.concept.title[0].plain_text,
      type: type.properties.Name.title[0].plain_text,
      status: ticket.properties.status.select.name,
    };

    return {
      ...data,
      amount: data.amount,
      dueDate: formatDate(new Date(data.issueDate), '-', 7),
      refCode: formatDate(data.issueDate, '') + '-' + data.brand.replace(/[aeiou]/g, '').substring(0, 2) + '-0' + data.concept.substring(0, 1),
      vat: data.type !== 'Cash' ? formatCurr.format(data.amount * .16) : 'N/A',
      totalAmountDue: data.type !== 'Cash' ? data.amount * 1.16 : data.amount,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function Receipt({searchParams}) {
  const {id} = searchParams;
  const data = await getData(id);

  const {issueDate, dueDate, brand, amount, concept, refCode, vat, totalAmountDue, status} = data;

  function statusRenderer() {
    if (status === 'Paid') {
      return <>
        <p className="text-center">Pagado, gracias</p>
        <p className="text-center -ft-2">Este no es un comprobante fiscal</p>
      </>;
    }
    return <>
      <p className="text-center">Pendiente de pago</p>
      <p className="text-center -ft-2">Este no es un comprobante fiscal</p>
    </>;
  }

  return (
    <div className="bg-gray-50 flex flex-col">
      <div className="w-full px-8 md:px-40 flex-grow mono border-b">
        <div className="flex flex-col md:flex-row border-b py-20">
          <div className="w-1/3 mb-12 md:mb-0 md:w-1/6 relative mx-auto flex flex-col justify-center items-center">
            <Image src={LogoSymbol} alt="Logo" className="w-2/3 mb-6"/>
            <Image src={Logotype} alt="Logo" className="w-full"/>
          </div>
          <div className="flex-grow flex justify-center md:justify-end md:items-end">
            <p className="text-center md:text-right -ft-2">Notoriovs Studio<br/>
              [Bar Code Services S.A. de C.V.]<br/>
              Montreal 1071, Providencia 2a Secc.<br/>
              Guadalajara, Jal.<br/>
              +52 (33) 1080 4567
            </p>
          </div>
        </div>
        <div className="py-16 grid grid-cols-2">
          <p className="text-left">Fecha emisión:</p>
          <p className="text-right">{issueDate}</p>
          <p className="text-left">Cliente:</p>
          <p className="text-right">{brand}</p>
          <p className="text-left">Referencia:</p>
          <p
            className="text-right uppercase">{refCode}</p>
          <p className="text-left">Status:</p>
          <p
            className="text-right">{status === 'Paid' ? 'Pagado' : 'Pendiente de pago'}</p>
        </div>
        <div className="grid pb-8 grid-cols-2 border-dashed border-b-2 border-black">
          <p className="font-bold text-left uppercase italic">Concepto</p>
          <p className="font-bold text-right uppercase italic">Monto</p>
        </div>
        <div className="py-12 grid grid-cols-2 border-dashed border-b-2 border-black">
          <p className="text-left">{concept}</p>
          <p className="text-right">{formatCurr.format(amount)}</p>
        </div>
        <div className="py-12 grid grid-cols-2">
          <p className="text-left">IVA:</p>
          <p className="text-right">{vat}</p>
          <p className="text-left">A pagar:</p>
          <p className="text-right">{formatCurr.format(totalAmountDue)}</p>
          <p className="text-left">Fecha límite pago:</p>
          <p className="text-right">{dueDate}</p>
        </div>
        <div className="py-12 border-dashed border-b-2 border-black">
          {statusRenderer()}
        </div>
        <div className="py-12">
          <p className="font-bold uppercase italic">Cuenta No Fiscal</p>
          <p><span className="font-bold">BANCO:</span> BBVA Bancomer</p>
          <p><span className="font-bold">CUENTA:</span> 115 644 5365</p>
          <p><span className="font-bold">CLABE:</span> 01 23200 115 644 5365 6</p>
        </div>
      </div>
      <p className="-ft-3 p-8 md:p-20">{id}</p>
    </div>
  );
}