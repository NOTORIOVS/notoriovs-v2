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

  const REVENUE_MIDPOINT = {
    '<50k':      30000,
    '50k-100k':  75000,
    '100k-300k': 200000,
    '300k-600k': 450000,
    '600k-1.5m': 1050000,
    '1.5m+':     2000000,
  };

  // Compras por año, para estimar el valor anual del cliente
  const LTV_MULTIPLIER = {
    '1x':        1,
    '2x':        2,
    '3x':        3,
    '4x+':       5,
    'recurring': 12,
  };

  // ── Precios de servicio y margen esperado del prospecto ──
  // Regla de negocio: la utilidad (~30%) que un solo cliente del prospecto genera
  // debe alcanzar para pagar, al menos, UN MES del servicio correspondiente.
  // Piso = precio_mensual / margen.
  const MARGIN = 0.40;
  const SERVICE_PRICE = {
    encendido:  2600,
    pulso:      8000,
    enterprise: 24000,
  };

  // ── Umbrales derivados (no se editan a mano, salen de SERVICE_PRICE y MARGIN) ──
  const LTV_FLOOR      = SERVICE_PRICE.encendido  / MARGIN;
  const PULSO_LTV      = SERVICE_PRICE.pulso      / MARGIN;
  const PULSO_TICKET   = PULSO_LTV;
  const ENTERPRISE_LTV = SERVICE_PRICE.enterprise / MARGIN;

  const PULSO_REVENUE  = 100000;  // facturación mínima para Pulso (piso de escala, no de margen)

  const fmt = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN';

  function metrics(a) {
    const ticket  = TICKET_MIDPOINT[a.averageTicket];
    const revenue = REVENUE_MIDPOINT[a.currentSales];
    const mult    = LTV_MULTIPLIER[a.ltv];
    if (ticket == null || revenue == null || mult == null) return null;
    const annualLTV = ticket * mult;
    return { ticket, revenue, mult, annualLTV, monthlyLTV: Math.round(annualLTV / 12) };
  }

  function buildFlags(a) {
    const flags = [];
    if (a.salesTeam === 'solo' || a.salesTeam === 'noProcess') {
      flags.push('Capacidad de cierre limitada: validar en llamada quién atiende y cierra los leads.');
    }
    if (a.customerType === 'transactional') {
      flags.push('Modelo transaccional: confirmar que aplica captación filtrada y no más bien contenido o reseñas.');
    }
    if (a.customerType === 'mixed') {
      flags.push('Modelo mixto: confirmar de dónde viene la mayoría del ingreso.');
    }
    return flags;
  }

  function suggestTier(a, m) {
    const hasTeam = a.salesTeam === '2-4' || a.salesTeam === '5+';

    // Enterprise: jugadores grandes con equipo comercial y valor de cliente
    // suficiente para justificar el precio de Enterprise.
    const isEnterprise =
      hasTeam && (m.ticket >= ENTERPRISE_LTV || m.annualLTV >= ENTERPRISE_LTV);
    if (isEnterprise) return 'Enterprise';

    // Pulso: el núcleo del modelo
    const pulsoValue = m.ticket >= PULSO_TICKET || m.annualLTV >= PULSO_LTV;
    if (pulsoValue && m.revenue >= PULSO_REVENUE) return 'Pulso';

    // Encendido: califica pero es chico
    return 'El Encendido';
  }

  function getQualificationResult(a) {
    const m = metrics(a);
    if (!m) {
      return {
        status: 'needs_info',
        reason: 'missing_data',
        tier: null,
        message: 'Faltan datos para calificar (ticket, facturación o recompra).',
        metrics: null,
        flags: [],
      };
    }

    // Compuerta económica: la utilidad estimada del cliente del prospecto debe
    // alcanzar para pagar el servicio de entrada (El Encendido).
    if (a.customerType === 'transactional') {
      // Para transaccional, el LTV equivale a una sola transacción: se compara
      // el ticket directo contra el piso, no el valor anual con recompra.
      if (a.ltv === '1x') {
        return {
          status: 'disqualified',
          reason: 'transactional_no_repeat',
          tier: null,
          message: `Modelo transaccional sin recompra (ticket ${fmt(m.ticket)}). Sin repetición de compra no califica, sin importar el ticket.`,
          metrics: m,
          flags: buildFlags(a),
        };
      }
      if (m.ticket < LTV_FLOOR) {
        return {
          status: 'disqualified',
          reason: 'transactional_weak_economics',
          tier: null,
          message: `Ticket insuficiente para un modelo transaccional (${fmt(m.ticket)}). La utilidad de una sola transacción debe alcanzar para pagar el servicio de entrada (piso ${fmt(LTV_FLOOR)}).`,
          metrics: m,
          flags: buildFlags(a),
        };
      }
    } else {
      if (m.annualLTV < LTV_FLOOR) {
        return {
          status: 'disqualified',
          reason: 'low_lifetime_value',
          tier: null,
          message: `Valor anual por cliente insuficiente (${fmt(m.annualLTV)}). La utilidad de un cliente debe alcanzar para pagar el servicio de entrada (piso ${fmt(LTV_FLOOR)}).`,
          metrics: m,
          flags: buildFlags(a),
        };
      }
    }

    // Calificado -> sugerir tier
    const tier = suggestTier(a, m);
    return {
      status: 'qualified',
      reason: null,
      tier,
      message: `Prospecto calificado. Tier sugerido: ${tier}. Valor anual estimado ${fmt(m.annualLTV)}.`,
      metrics: m,
      flags: buildFlags(a),
    };
  }

  return getQualificationResult(answers);
}
