const boxService = require('../services/boxService');

exports.createBox = async (req, res) => {
    try {
        const box = await boxService.createBox(req.body);
        res.status(201).json(box);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllBoxes = async (req,res) => {
    try {
        const boxes = await boxService.getAllBoxes();
        res.json(boxes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllBoxesPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const result = await boxService.getAllBoxesPaginated(page, limit);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};