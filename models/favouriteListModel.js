'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavouriteListSchema = new Schema({
  recipes: [Schema.Types.ObjectId],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  FavouriteListModel: mongoose.model('FavouriteList', FavouriteListSchema),
  FavouriteListSchema: FavouriteListSchema
}
