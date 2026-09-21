export const getHealth = (req, res) => {
  res.json({
    app: 'MechConnect API',
    status: 'running',
  });
};
