var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  uid: String,
  logLevel: {
    type: String,
    default: 'info'
  },
  sync:{
    type: String,
    default: 'off'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.updateAt = this.meta.createAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
});

UserSchema.statics = {
  fetch: function (cb) {
    return this.find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({_id: id})
      .sort('meta.createAt')
      .exec(cb);
  },
  findByUid: function (uid, cb) {
    return this.findOne({uid: uid})
      .sort('meta.createAt')
      .exec(cb);
  }
};

module.exports = UserSchema;