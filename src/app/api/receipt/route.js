import { notion } from '@/services/notion';
import { formatCurr, formatDate } from '@/utils/formatters';

export async function POST(request) {
  const url = new URL(request.url);
  const query = url.searchParams;
  const id = query.get('id');

  try {
    const ticket = await notion.pages.retrieve({page_id: id});
    const bankAccount = await notion.pages.retrieve({page_id: ticket.properties.bank_account.relation[0].id});
    const brand = await notion.pages.retrieve({page_id: ticket.properties.brand.relation[0].id});

    const t = ticket.properties;
    const bank = bankAccount.properties;

    const data = {
      dueDate: new Date(t.due_date.date.start).toISOString().slice(0, 10),
      amount: t.amount.number,
      concept: t.concept.title[0].plain_text,
      status: t.status.select.name,
      brand: t.v_brand.formula.string,
      client: brand.properties.v_partner.formula.string,
      contact: brand.properties['Contact Person'].rich_text[0].plain_text,
      email: brand.properties['Contact Email'].email,
      bankAccount: {
        name: bank.bank_name.rich_text[0].plain_text,
        acctNumber: bank.acct_number.rich_text[0].plain_text,
        clabe: bank.clabe.rich_text[0].plain_text,
      },
      fiscal: t.fiscal.checkbox,
    };

    const payload = {
      ...data,
      type: data.status === 'Paid' ? 'Recibo de pago' : 'Recordatorio de pago',
      status: data.status === 'Paid' ? 'Pagado, gracias!' : 'Pendiente de pago',
      amount: formatCurr.format(data.amount),
      issueDate: new Date(formatDate(data.dueDate, '-', -5)).toISOString().slice(0, 10),
      refCode: data.dueDate.replace(/-/g, '') + '-' + data.brand.replace(/[aeiou]/g, '').substring(0, 2) + '-0' + data.concept.match(/\d{2}/),
      vat: data.fiscal !== false ? formatCurr.format(data.amount * .16) : 'N/A',
      totalAmountDue: data.fiscal !== false ? formatCurr.format(data.amount * 1.16) : formatCurr.format(data.amount),
    }

    return new Response(JSON.stringify({
      type: payload.type,
      issue_date: payload.issueDate,
      due_date: payload.dueDate,
      client: payload.client,
      contact: payload.contact,
      email: payload.email,
      brand: payload.brand,
      ref_code: payload.refCode,
      concept: payload.concept,
      formatted_amount: payload.amount,
      vat: payload.vat,
      total_amount_due: payload.totalAmountDue,
      status_text: payload.status,
      fiscal: payload.fiscal,
      bank_name: payload.bankAccount.name,
      acct_number: payload.bankAccount.acctNumber,
      clabe: payload.bankAccount.clabe,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.log(e);
    return new Response({data: 'data not found'}, {status: 500});
  }
}