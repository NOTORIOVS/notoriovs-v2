export function formatDate(value = new Date, separator = '-', addedDays = 0) {
  let date = new Date(value);
  const day = (date.getDate() + addedDays).toLocaleString('es-MX', {day: '2-digit'});
  const month = date.toLocaleString('es-MX', {month: '2-digit'});
  const year = date.toLocaleString('es-MX', {year: 'numeric'});
  return year + separator + month + separator + day;
}

export const formatCurr = new Intl.NumberFormat('en-US', {
  style: 'currency',
  minimumFractionDigits: 2,
  currency: 'MXN',
});