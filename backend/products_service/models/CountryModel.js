const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  iso3: { type: String },
  iso2: { type: String },
  phone_code: { type: String },
  capital: { type: String },
  currency: { type: String },
  currency_symbol: { type: String },
  tld: { type: String },
  native: { type: String },
  region: { type: String },
  subregion: { type: String },
  timezones: [
    {
      zoneName: {
        type: String,
      },
      gmtOffset: { type: Number },
      gmtOffsetName: { type: String },
      abbreviation: { type: String },
      tzName: { type: String },
    },
  ],
  translations: { type: Object },
  latitude: { type: String },
  longitude: { type: String },
  emoji: { type: String },
  emojiU: { type: String },
});

module.exports = mongoose.model("countries", CountrySchema);
