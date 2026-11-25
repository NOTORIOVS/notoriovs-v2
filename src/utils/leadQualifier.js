export default function LeadQualifier({ answers }) {

  // ── Midpoints: convierten los buckets del quiz en números estimados ──
  const TICKET_MIDPOINT = {
    '<2.5k':     1750,
    '2.5k-5k':   4000,
    '5k-15k':    10000,
    '15k-50k':   35000,
    '50k-150k':  120000,
    '150k+':     200000,
  };

  // Facturación MENSUAL (así se pregunta en el survey)
  const REVENUE_MIDPOINT = {
    '<50k':      30000,
    '50k-100k':  75000,
    '100k-300k': 200000,
    '300k-600k': 450000,
    '600k-1.5m': 1050000,
    '1.5m+':     2000000,
  };

  // Compras por año, para estimar el valor anual del cliente (solo informativo)
  const LTV_MULTIPLIER = {
    '1x':        1,
    '2x':        2,
    '3x':        3,
    '4x+':       5,
    'recurring': 12,
  };

  // ── Regla de negocio ──
  // El prospecto debe poder sostener el flujo mensual del programa (servicio + pauta)
  // sin que rebase el MAX_SPEND_SHARE de su utilidad mensual.
  //   capacidad = facturación mensual × MARGIN × MAX_SPEND_SHARE
  const MARGIN          = 0.40;  // margen de utilidad estimado del prospecto
  const MAX_SPEND_SHARE = 0.30;  // tope de la utilidad mensual destinada a servicio + pauta
  const AD_SPEND        = 4000;  // pauta mensual mínima

  // Programas. `minMonthlyFlow` = flujo mensual en el peor caso (servicio + pauta).
  const PROGRAMS = {
    pulso: {
      name: 'Pulso',
      months: 3,
      minMonthlyFlow: 20000, // ~$16k servicio promedio (48k / 3) + $4k pauta
      payments: {
        cash:        { label: 'Contado',              total: 40000, firstPayment: 40000 },
        installments:{ label: '3 pagos (24k/12k/12k)', total: 48000, firstPayment: 24000 },
        msi:         { label: 'TDC hasta 12 MSI',      total: 48000, firstPayment: 4000 },
      },
    },
    notoriovs90: {
      name: 'Notoriovs 90',
      months: 3,
      minMonthlyFlow: 8000,  // $4k servicio (24k a 6 MSI) + $4k pauta
      payments: {
        cash:        { label: 'Contado',              total: 18000, firstPayment: 18000 },
        installments:{ label: '3 pagos (12k/6k/6k)',   total: 24000, firstPayment: 12000 },
        msi:         { label: 'TDC 6 MSI',             total: 24000, firstPayment: 4000 },
      },
    },
  };

  // Ventas incrementales al mes que necesita para recuperar el flujo mínimo.
  // Arriba de esto se marca como alerta (no descalifica).
  const BREAK_EVEN_SALES_ALERT = 10;

  const fmt = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN';

  function metrics(a) {
    const revenue = REVENUE_MIDPOINT[a.currentSales];
    if (revenue == null) return null;

    const ticket = TICKET_MIDPOINT[a.averageTicket] ?? null;
    const mult   = LTV_MULTIPLIER[a.ltv] ?? null;

    const monthlyProfit   = revenue * MARGIN;
    const monthlyCapacity = monthlyProfit * MAX_SPEND_SHARE;
    const annualLTV       = ticket != null && mult != null ? ticket * mult : null;
    const breakEvenSales  = ticket != null
      ? Math.ceil(PROGRAMS.notoriovs90.minMonthlyFlow / (ticket * MARGIN))
      : null;

    return {
      revenue,
      monthlyProfit,
      monthlyCapacity: Math.round(monthlyCapacity),
      ticket,
      mult,
      annualLTV,
      breakEvenSales,
    };
  }

  // Sugiere la forma de pago más conveniente que el flujo del prospecto aguanta
  // en el primer mes (primer pago + pauta).
  function suggestPayment(program, m) {
    const order = ['cash', 'installments', 'msi'];
    for (const key of order) {
      const option = program.payments[key];
      if (m.monthlyCapacity >= option.firstPayment + AD_SPEND) {
        return { key, ...option };
      }
    }
    return { key: 'msi', ...program.payments.msi };
  }

  function buildFlags(a, m) {
    const flags = [];
    if (a.salesTeam === 'solo') {
      flags.push('Capacidad de cierre limitada: validar en llamada quién atiende y cierra los leads.');
    }
    if (a.customerType === 'transactional') {
      flags.push('Modelo transaccional: confirmar que aplica captación filtrada y no más bien contenido o reseñas.');
      if (a.ltv === '1x') {
        flags.push('Transaccional sin recompra: el retorno depende 100% del volumen de ventas nuevas.');
      }
    }
    if (a.customerType === 'mixed') {
      flags.push('Modelo mixto: confirmar de dónde viene la mayoría del ingreso.');
    }
    if (m.breakEvenSales != null && m.breakEvenSales > BREAK_EVEN_SALES_ALERT) {
      flags.push(`Necesita ~${m.breakEvenSales} ventas incrementales/mes para recuperar la inversión mínima: validar volumen y capacidad de atención.`);
    }
    return flags;
  }

  function getQualificationResult(a) {
    const m = metrics(a);
    if (!m) {
      return {
        status: 'needs_info',
        reason: 'missing_data',
        tier: null,
        payment: null,
        message: 'Falta la facturación mensual para calificar.',
        metrics: null,
        flags: [],
      };
    }

    const flags = buildFlags(a, m);

    const program = [PROGRAMS.pulso, PROGRAMS.notoriovs90]
      .find((p) => m.monthlyCapacity >= p.minMonthlyFlow);

    if (!program) {
      return {
        status: 'disqualified',
        reason: 'insufficient_cash_flow',
        tier: null,
        payment: null,
        message: `Flujo insuficiente. Con facturación de ${fmt(m.revenue)}/mes, el ${MAX_SPEND_SHARE * 100}% de su utilidad es ${fmt(m.monthlyCapacity)}; el mínimo es ${fmt(PROGRAMS.notoriovs90.minMonthlyFlow)}/mes (servicio + pauta).`,
        metrics: m,
        flags,
      };
    }

    const payment = suggestPayment(program, m);
    return {
      status: 'qualified',
      reason: null,
      tier: program.name,
      payment,
      message: `Prospecto calificado. Programa sugerido: ${program.name} (${payment.label}). Capacidad mensual estimada ${fmt(m.monthlyCapacity)}.`,
      metrics: m,
      flags,
    };
  }

  return getQualificationResult(answers);
}
