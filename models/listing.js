const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1605140316783-b43dfc1df270%3Fq%3D80%26w%3D1000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MXx8aGklMjByZXNvbHV0aW9ufGVufDB8fDB8fHww&tbnid=9mnNuIza5IxShM&vet=12ahUKEwi5t_KW4v2DAxWkkmMGHcwvDmAQMygAegQIARBY..i&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhi-resolution&docid=v-bFAyKSFklPPM&w=1000&h=667&q=unsplash&hl=en&ved=2ahUKEwi5t_KW4v2DAxWkkmMGHcwvDmAQMygAegQIARBY",
    set: (v) =>
      v === ""
        ? "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1605140316783-b43dfc1df270%3Fq%3D80%26w%3D1000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MXx8aGklMjByZXNvbHV0aW9ufGVufDB8fDB8fHww&tbnid=9mnNuIza5IxShM&vet=12ahUKEwi5t_KW4v2DAxWkkmMGHcwvDmAQMygAegQIARBY..i&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhi-resolution&docid=v-bFAyKSFklPPM&w=1000&h=667&q=unsplash&hl=en&ved=2ahUKEwi5t_KW4v2DAxWkkmMGHcwvDmAQMygAegQIARBY"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ reviews: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
