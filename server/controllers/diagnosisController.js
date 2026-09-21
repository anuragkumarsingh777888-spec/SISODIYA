const rules = [
  {
    symptom: 'engine making noise',
    possibleCause: 'Loose belt, worn bearings, or failing engine components.',
    severity: 'High',
    recommendedAction: 'Inspect the engine bay and schedule a diagnostic check within 24 hours.',
    mechanicRecommended: true,
  },
  {
    symptom: 'vehicle not starting',
    possibleCause: 'Dead battery, starter issue, or fuel delivery problem.',
    severity: 'Critical',
    recommendedAction: 'Check battery voltage and starter connections immediately. Avoid repeated attempts.',
    mechanicRecommended: true,
  },
  {
    symptom: 'brake problem',
    possibleCause: 'Worn brake pads, low brake fluid, or rotor damage.',
    severity: 'High',
    recommendedAction: 'Stop driving and inspect brake pads and fluid levels urgently.',
    mechanicRecommended: true,
  },
  {
    symptom: 'battery problem',
    possibleCause: 'Weak or failing battery or alternator issue.',
    severity: 'Medium',
    recommendedAction: 'Test the battery and charging system; replace if voltage is below normal.',
    mechanicRecommended: true,
  },
  {
    symptom: 'low mileage',
    possibleCause: 'Possible fuel system issue, sensor problem, or inaccurate odometer reading.',
    severity: 'Low',
    recommendedAction: 'Check fuel consumption, engine sensors, and tyre pressure before planning service.',
    mechanicRecommended: false,
  },
  {
    symptom: 'overheating',
    possibleCause: 'Cooling system leak, low coolant, or thermostat failure.',
    severity: 'Critical',
    recommendedAction: 'Stop the vehicle, allow it to cool, and inspect coolant and radiator immediately.',
    mechanicRecommended: true,
  },
];

export const diagnoseVehicleIssue = (req, res) => {
  const { symptom } = req.body;
  const normalized = String(symptom || '').trim().toLowerCase();

  if (!normalized) {
    return res.status(400).json({ message: 'Symptom is required.' });
  }

  const match = rules.find((rule) => normalized.includes(rule.symptom));

  if (!match) {
    return res.json({
      possibleCause: 'General maintenance issue; inspect the vehicle with a mechanic.',
      severity: 'Medium',
      recommendedAction: 'Run a full checkup and review any warning lights on the dashboard.',
      mechanicRecommended: true,
    });
  }

  return res.json(match);
};
