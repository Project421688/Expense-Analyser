const Egg = require('../models/Egg');

// Get all records
exports.getEggs = async (req, res) => {
  try {
    const eggs = await Egg.findAll();
    res.json(eggs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new record
exports.addEgg = async (req, res) => {
  try {
    const { date, time, rate_per_plate, no_of_plate, amount } = req.body;
    const newEgg = await Egg.create({ date, time, rate_per_plate, no_of_plate, amount });
    res.status(201).json(newEgg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
