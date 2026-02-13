import {
  MEETINGS_PER_SDR_PER_MONTH,
  RAMP_MONTHS,
  DELIVERY_RATE,
  PROJECTION_MONTHS,
} from "./constants";

export interface CalculatorInputs {
  dealSize: number;
  closeRate: number; // percentage, e.g. 15 = 15%
  salesCycle: number; // months
  sdrCount: number;
  currentMeetings: number;
  monthlyBudget: number;
}

export interface MonthProjection {
  month: string;
  monthIndex: number;
  currentMeetings: number;
  outboundMeetings: number;
  currentPipeline: number;
  outboundPipeline: number;
  currentRevenue: number;
  outboundRevenue: number;
  cumulativeCurrent: number;
  cumulativeOutbound: number;
  investment: number;
}

export interface Summary {
  addedMeetingsPerMonth: number;
  totalMonthlyMeetings: number;
  monthlyPipelineAdded: number;
  annualRevenueAdded: number;
  totalInvestment: number;
  roi: number;
  costPerMeeting: number;
  breakEvenMonth: number | null;
  pipelineMultiplier: string;
}

function getAddedMeetings(
  monthIndex: number,
  sdrCount: number
): number {
  const fullVelocity = sdrCount * MEETINGS_PER_SDR_PER_MONTH * DELIVERY_RATE;

  if (monthIndex < RAMP_MONTHS) {
    // Linear ramp: month 0 = 1/2 velocity, month 1 = full velocity
    return ((monthIndex + 1) / RAMP_MONTHS) * fullVelocity;
  }

  return fullVelocity;
}

export function projectOutbound(inputs: CalculatorInputs): MonthProjection[] {
  const {
    dealSize,
    closeRate,
    salesCycle,
    sdrCount,
    currentMeetings,
    monthlyBudget,
  } = inputs;

  const closeRateDecimal = closeRate / 100;
  const projections: MonthProjection[] = [];
  let cumulativeCurrent = 0;
  let cumulativeOutbound = 0;

  // Pre-calculate meetings per month (for revenue delay lookup)
  const meetingsPerMonth: { current: number; outbound: number }[] = [];
  for (let i = 0; i < PROJECTION_MONTHS; i++) {
    const added = getAddedMeetings(i, sdrCount);
    meetingsPerMonth.push({
      current: currentMeetings,
      outbound: currentMeetings + added,
    });
  }

  for (let i = 0; i < PROJECTION_MONTHS; i++) {
    // Revenue from meetings is delayed by salesCycle months
    // Meetings booked in month M generate revenue in month M + salesCycle
    const revenueSourceMonth = i - salesCycle;

    let currentRevenue = 0;
    let outboundRevenue = 0;

    if (revenueSourceMonth >= 0) {
      const sourceMeetings = meetingsPerMonth[revenueSourceMonth];
      currentRevenue =
        sourceMeetings.current * closeRateDecimal * dealSize;
      outboundRevenue =
        sourceMeetings.outbound * closeRateDecimal * dealSize;
    }

    cumulativeCurrent += currentRevenue;
    cumulativeOutbound += outboundRevenue;

    const added = getAddedMeetings(i, sdrCount);
    const totalMeetings = currentMeetings + added;
    const investment = monthlyBudget * (i + 1);

    projections.push({
      month: `M${i + 1}`,
      monthIndex: i,
      currentMeetings,
      outboundMeetings: Math.round(totalMeetings),
      currentPipeline: Math.round(totalMeetings * dealSize),
      outboundPipeline: Math.round(totalMeetings * dealSize),
      currentRevenue: Math.round(currentRevenue),
      outboundRevenue: Math.round(outboundRevenue),
      cumulativeCurrent: Math.round(cumulativeCurrent),
      cumulativeOutbound: Math.round(cumulativeOutbound),
      investment,
    });
  }

  return projections;
}

export function computeSummary(
  inputs: CalculatorInputs,
  projections: MonthProjection[]
): Summary {
  const { sdrCount, currentMeetings, monthlyBudget, dealSize } = inputs;

  const fullVelocityMeetings =
    sdrCount * MEETINGS_PER_SDR_PER_MONTH * DELIVERY_RATE;
  const addedMeetingsPerMonth = Math.round(fullVelocityMeetings);
  const totalMonthlyMeetings = currentMeetings + addedMeetingsPerMonth;
  const monthlyPipelineAdded = addedMeetingsPerMonth * dealSize;

  const lastMonth = projections[projections.length - 1];
  const annualRevenueAdded =
    lastMonth.cumulativeOutbound - lastMonth.cumulativeCurrent;
  const totalInvestment = monthlyBudget * PROJECTION_MONTHS;

  const roi =
    totalInvestment > 0
      ? ((annualRevenueAdded - totalInvestment) / totalInvestment) * 100
      : 0;

  const costPerMeeting =
    addedMeetingsPerMonth > 0 ? monthlyBudget / addedMeetingsPerMonth : 0;

  // Find break-even month: first month where cumulative outbound revenue
  // minus cumulative current revenue exceeds cumulative investment
  let breakEvenMonth: number | null = null;
  for (const p of projections) {
    const netGain = p.cumulativeOutbound - p.cumulativeCurrent - p.investment;
    if (netGain > 0) {
      breakEvenMonth = p.monthIndex + 1;
      break;
    }
  }

  const pipelineMultiplier =
    currentMeetings > 0
      ? `${(totalMonthlyMeetings / currentMeetings).toFixed(1)}x`
      : `${totalMonthlyMeetings}x`;

  return {
    addedMeetingsPerMonth,
    totalMonthlyMeetings,
    monthlyPipelineAdded,
    annualRevenueAdded,
    totalInvestment,
    roi,
    costPerMeeting,
    breakEvenMonth,
    pipelineMultiplier,
  };
}

export function formatCurrency(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}
