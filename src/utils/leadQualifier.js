export default function LeadQualifier({answers}) {

  const MARGIN_TABLE = {
    service: {
      professionalServices: 0.55,
      medical:              0.50,
      finance:               0.55,
      realEstate:           0.55,
      industrial:           0.35,
      eCommerce:            0.30,
      education:            0.50,
      other:                0.35,
    },
    product: {
      professionalServices: 0.30,
      medical:              0.35,
      finance:               0.25,
      realEstate:           0.25,
      industrial:           0.25,
      eCommerce:            0.18,
      education:            0.25,
      other:                0.22,
    },
  };

  const REVENUE_MIDPOINT = {
    '<100k':      80000,
    '100k-300k':  200000,
    '300k-600k':  450000,
    '600k-1.5m':  1050000,
    '1.5m+':      2000000,
  };

  function estimateMonthlyProfit(answers) {
    const margin = MARGIN_TABLE[answers.productType]?.[answers.businessVertical];
    const revenue = REVENUE_MIDPOINT[answers.currentSales];

    if (!margin || !revenue) return null;

    return {
      estimatedRevenue:      revenue,
      estimatedMargin:       margin,
      estimatedMonthlyProfit: Math.round(revenue * margin),
    };
  }

  function getQualificationResult(answers) {
    const profit = estimateMonthlyProfit(answers);

    // Filtro — Utilidad estimada menor a $40k/mes
    // No puede absorber Auditoría ($36k) + retainer ($30k+) sin comprometer la operación
    if (profit && profit.estimatedMonthlyProfit < 40000) {
      return {
        status:  'disqualified',
        reason:  'low_margin',
        message: `Utilidad bruta estimada insuficiente (~$${profit.estimatedMonthlyProfit.toLocaleString('es-MX')} MXN/mes).`,
        profit,
      };
    }

    // Calificado
    return {
      status:  'qualified',
      reason:  null,
      message: 'Prospecto calificado.',
      profit,
    };
  }

  return getQualificationResult(answers);
}