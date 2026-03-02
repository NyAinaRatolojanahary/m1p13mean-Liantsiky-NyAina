const jetonService = require('../services/jetonService')

exports.createJeton = async (req, res) => {
  try {
    const jeton = await jetonService.createJeton(req.body);
    res.status(201).json({
      success: true,
      data: jeton
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllJetons = async (req, res) => {
  try {
    const data = await jetonService.getAllJetons();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllJetonsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await jetonService.getAllJetonsPaginated(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
