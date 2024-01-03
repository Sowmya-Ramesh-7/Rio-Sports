
  
  // Cart Schema
  const cartSchema = new Schema({
    cart: [
      {product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },}
  ],
  });
  
  const Cart = mongoose.model("Cart", cartSchema);