const Crop = require('../db/User/CropSchema');
const fs = require('fs');
const path = require('path');

exports.getCropsData = (req, res) => {
  fs.readFile(path.join(__dirname, '../db/crops.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    res.json(JSON.parse(data));
  });
};

exports.getCropByName = (req, res) => {
  fs.readFile(path.join(__dirname, '../db/crops.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    const crops = JSON.parse(data);
    const crop = crops.find(crop => crop.name.toLowerCase() === req.params.name.toLowerCase());
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  });
};

exports.getCropById = async (req, res) => {
  try {
    const id = req.params.id;
    const crop = await Crop.findById(id);
    console.log(crop);
    if (crop == null) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCropsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const crop = await Crop.find({ userId });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

exports.addCrop = async (req, res) => {
  const { name, variety, quantity, plantedDate, estimatedHarvestDate, userId, userName } = req.body;
  console.log(name, variety, quantity, plantedDate, estimatedHarvestDate);
  const crop = new Crop({ name, variety, quantity, plantedDate, estimatedHarvestDate, userId, userName });
  try {
    const newCrop = await crop.save();
    console.log(newCrop);
    res.status(201).json(newCrop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop == null) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    if (req.body.name != null) {
      crop.name = req.body.name;
    }
    if (req.body.variety != null) {
      crop.variety = req.body.variety;
    }
    if (req.body.quantity != null) {
      crop.quantity = req.body.quantity;
    }
    if (req.body.plantedDate != null) {
      crop.plantedDate = req.body.plantedDate;
    }
    if (req.body.estimatedHarvestDate != null) {
      crop.estimatedHarvestDate = req.body.estimatedHarvestDate;
    }
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop == null) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    await crop.deleteOne();
    res.json({ message: 'Crop deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};