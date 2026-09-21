const diagnosisRules = [
  {
    keyword: 'engine making noise',
    result: {
      possibleCause: 'Loose timing belt or low engine oil',
      severity: 'Medium',
      recommendedAction: 'Check engine oil level and inspect the timing belt tension immediately.',
      mechanicRecommended: true,
    },
  },
  {
    keyword: 'not starting',
    result: {
      possibleCause: 'Weak battery or faulty starter motor',
      severity: 'High',
      recommendedAction: 'Test battery voltage and inspect the ignition system before restarting the vehicle.',
      mechanicRecommended: true,
    },
  },
  {
    keyword: 'brake',
    result: {
      possibleCause: 'Brake pad wear or fluid leakage',
      severity: 'High',
      recommendedAction: 'Avoid driving until the brake system is inspected by a certified mechanic.',
      mechanicRecommended: true,
    },
  },
  {
    keyword: 'battery',
    result: {
      possibleCause: 'Battery discharge or alternator issue',
      severity: 'Medium',
      recommendedAction: 'Check charging voltage and test battery health; jump-start only if necessary.',
      mechanicRecommended: true,
    },
  },
  {
    keyword: 'low mileage',
    result: {
      possibleCause: 'Possible fuel or engine efficiency issue',
      severity: 'Low',
      recommendedAction: 'Review fuel consumption, tire pressure, and engine tuning schedule.',
      mechanicRecommended: false,
    },
  },
  {
    keyword: 'overheating',
    result: {
      possibleCause: 'Cooling system issue or coolant leak',
      severity: 'High',
      recommendedAction: 'Stop driving and inspect coolant level, radiator, and fan operation immediately.',
      mechanicRecommended: true,
    },
  },
];

export function diagnoseVehicleIssue(symptomText) {
  const normalized = (symptomText || '').toLowerCase();

  const match = diagnosisRules.find((rule) => normalized.includes(rule.keyword));

  if (!match) {
    return {
      possibleCause: 'Issue not clearly matched. Please describe the symptom in more detail.',
      severity: 'Low',
      recommendedAction: 'Book a basic vehicle inspection to confirm the root cause.',
      mechanicRecommended: true,
    };
  }

  return match.result;
}
