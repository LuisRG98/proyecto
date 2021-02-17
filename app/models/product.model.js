const mongoose = require("mongoose")
const categories = mongoose.Schema({
    categoria: String,
    sub: String
})
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            ownerId: String,
            description: String,
            image: {
                type: Array,
                default: []
            },
            categories: [categories],
            price: Number,
            available: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tutorial = mongoose.model("product", schema);
    return Tutorial;
};