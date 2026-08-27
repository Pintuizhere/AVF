const mongoose = require('mongoose');

const aboutHeroSchema = new mongoose.Schema({
  badge: {
    type: String,
    default: "A Note From Our Founder"
  },
  title: {
    type: String,
    default: "Akash Verma"
  },
  subtitle: {
    type: String,
    default: "Founder. Filmmaker. Dreamer."
  },
  content: {
    type: String,
    default: "For me, filmmaking is not just about cameras and editing. It's about people, emotions and moments that stay forever. I believe in creating visuals that are honest, raw and real. Every frame we create is a promise—to tell your story with authenticity and passion."
  },
  signatureName: {
    type: String,
    default: "Akash Verma"
  },
  signatureRole: {
    type: String,
    default: "Founder"
  },
  image: {
    type: String,
    default: "/images/director.jpg"
  }
}, { timestamps: true });

module.exports = mongoose.model('AboutHero', aboutHeroSchema);
