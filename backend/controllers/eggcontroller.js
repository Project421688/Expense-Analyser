const Egg = require('../models/Egg');

// All + filter + pagination
exports.getEggs = async (req, res) => {
  try {
    const { from, to, page = 1, limit = 10 } = req.query;
    const whereClause = {};

    if (from && to) {
      whereClause.date = {
        [Op.between]: [from, to]
      };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Egg.findAndCountAll({
      where: whereClause,
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      data: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
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

// Get last 5 records
exports.getLastFiveEggs = async (req, res) => {
  try {
    const eggs = await Egg.findAll({
      order: [['egg_id', 'DESC']], // newest first
      limit: 5
    });
    res.json(eggs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



