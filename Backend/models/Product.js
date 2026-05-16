const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    original_price: {
      type: Number,
      required: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    badge_discount: {
      type: String,
      default: '',
    },
    badge_new: {
      type: Boolean,
      default: false,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    category_id: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Map the _id field to id
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
