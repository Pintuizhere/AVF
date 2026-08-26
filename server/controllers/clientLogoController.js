const ClientLogo = require('../models/ClientLogo');
const { cloudinary } = require('../config/cloudinary');

exports.getClients = async (req, res) => {
  try {
    const clients = await ClientLogo.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, zoom } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Logo image is required' });
    }

    const newClient = new ClientLogo({
      name,
      logoUrl: req.file.path,
      zoom: zoom || 1.0
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, zoom } = req.body;

    const client = await ClientLogo.findById(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    if (name) client.name = name;
    if (zoom !== undefined) client.zoom = zoom;
    
    // If a new image was uploaded
    if (req.file) {
      // Optional: Delete old image from cloudinary
      // const publicId = client.logoUrl.split('/').pop().split('.')[0];
      // await cloudinary.uploader.destroy(`avf/${publicId}`);
      
      client.logoUrl = req.file.path;
    }

    await client.save();
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await ClientLogo.findById(id);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Extract public ID from Cloudinary URL and delete it
    if (client.logoUrl) {
      try {
        const urlParts = client.logoUrl.split('/');
        const filename = urlParts.pop(); // e.g., "zxfghjkld.png"
        const publicIdBase = filename.split('.')[0]; // "zxfghjkld"
        const folder = urlParts.pop(); // e.g., "avf"
        const publicId = `${folder}/${publicIdBase}`;
        
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }

    await ClientLogo.findByIdAndDelete(id);
    res.json({ message: 'Client removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
