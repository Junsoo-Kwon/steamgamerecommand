var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    _id: { type: String },
    is_survey: { type: Boolean },
    survey_game_id: { type: Array },
    genre: { type: Object },
  },
  {
    versionKey: false,
  }
);

userSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload);
  // return Promise
  return user.save();
};

module.exports = mongoose.model("user", userSchema);
