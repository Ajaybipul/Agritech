const Farm = require('../db/User/FarmSchema');

exports.addFarm = async (req, res) => {
  const { name, location, areaSize, cropType, createdAt, userId, userName } = req.body;
  const farm = new Farm({ name, location, areaSize, cropType, createdAt, userId, userName });
  try {
    const newFarm = await farm.save();
    console.log('Saved farm:', newFarm);
    res.status(201).json(newFarm);
  } catch (err) {
    console.error('Error saving farm:', err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.status(200).json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFarms = async (req, res) => {
  try {
    const farm = await Farm.find();
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.status(200).json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFarmsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const crop = await Farm.find({ userId });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

exports.updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.status(200).json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.status(200).json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};