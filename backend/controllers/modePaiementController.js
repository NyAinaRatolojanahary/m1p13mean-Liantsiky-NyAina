const modePaiementService = require('../services/modePaiementService');

exports.getAllModesPaiement = async (req,res) => {
    try{
        try {
        const data = await modePaiementService.getAllModesPaiement();
        res.status(200).json(data);
        } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        }
    } catch(error) {
         res.status(500).json({ success: false, message: error.message });
    }
}

exports.createModePaiement = async (req, res) => {
  try {
    const box = await modePaiementService.createModePaiement(req.body);
    res.status(201).json({
      success: true,
      data: box
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};