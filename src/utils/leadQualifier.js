export default function LeadQualifier({answers}) {

  const MARGIN_TABLE = {
    service: {
      b2b: {
        professionalServices: 0.55,
        medical:              0.50,
        finance:              0.55,
        realEstate:           0.42,
        industrial:           0.38,
        eCommerce:            0.35,
        education:            0.52,
        other:                0.38,
      },
      b2c: {
        professionalServices: 0.50,
        medical:              0.48,
        finance:              0.50,
        realEstate:           0.38,
        industrial:           0.32,
        eCommerce:            0.30,
        education:            0.48,
        other:                0.35,
      },
      both: {
        professionalServices: 0.52,
        medical:              0.49,
        finance:              0.52,
        realEstate:           0.40,
        industrial:           0.35,
        eCommerce:            0.32,
        education:            0.50,
        other:                0.36,
      },
    },
    product: {
      b2b: {
        professionalServices: 0.42,
        medical:              0.38,
        finance:              0.38,
        realEstate:           0.35,
        industrial:           0.38,
        eCommerce:            0.30,
        education:            0.35,
        other:                0.32,
      },
      b2c: {
        professionalServices: 0.28,
        medical:              0.32,
        finance:              0.22,
        realEstate:           0.22,
        industrial:           0.22,
        eCommerce:            0.18,
        education:            0.22,
        other:                0.20,
      },
      both: {
        professionalServices: 0.35,
        medical:              0.35,
        finance:              0.30,
        realEstate:           0.28,
        industrial:           0.30,
        eCommerce:            0.24,
        education:            0.28,
        other:                0.26,
      },
    },
  };

  const REVENUE_MIDPOINT = {
    '<100k':      80000,
    '100k-300k':  200000,
    '300k-600k':  450000,
    '600k-1.5m':  1050000,
    '1.5m+':      2000000,
  };

  const TICKET_MIDPOINT = {
    '<5k':      3500,
    '5k-15k':   10000,
    '15k-50k':  32500,
    '50k-150k': 100000,
    '150k+':    200000,
  };

  const LTV_MULTIPLIER = {
    '1x':       1,
    '2x':       2,
    '3x':       3,
    '4x+':      5,
    'recurring': 12,
  };

  function estimateLTV(answers) {
    const ticket     = TICKET_MIDPOINT[answers.averageTicket];
    const multiplier = LTV_MULTIPLIER[answers.ltv];

    if (!ticket || !multiplier) return null;

    return {
      annualLTV:    Math.round(ticket * multiplier),
      monthlyLTV:   Math.round((ticket * multiplier) / 12),
    };
  }

  function estimateMonthlyProfit(answers) {
    const { productType, customerType, businessVertical, currentSales } = answers;

    const margin = MARGIN_TABLE[productType]?.[customerType]?.[businessVertical];
    const revenue = REVENUE_MIDPOINT[currentSales];

    if (!margin || !revenue) return null;

    return {
      estimatedRevenue:      revenue,
      estimatedMargin:       margin,
      estimatedMonthlyProfit: Math.round(revenue * margin),
    };
  }

  function getQualificationResult(answers) {
    const ltv    = estimateLTV(answers);
    const profit = estimateMonthlyProfit(answers);
    const lowRevenue = answers.currentSales === '<100k';
    const lowLtv = !ltv || ltv.annualLTV < 50000;
    const lowProfit = profit && profit.estimatedMonthlyProfit < 40000;

    if (lowRevenue && !lowLtv) {
      return {
        status:  'qualified',
        reason:  'high_lifetime_value',
        message: `Lifetimevalue estimado suficiente (~$${ltv.annualLTV.toLocaleString('es-MX')} MXN/año).`,
        profit,
      };
    }

    if (lowRevenue && lowProfit) {
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