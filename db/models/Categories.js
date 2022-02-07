const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');
const RecpieSchema = new mongoose.Schema(
  {
    title: String,
    recipies:[{type: mongoose.Schema.Types.ObjectId, ref: "Recpie"}]
    
  });


module.exports = mongoose.model('Recpie', RecpieSchema);
