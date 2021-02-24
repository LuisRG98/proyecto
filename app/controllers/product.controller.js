const db = require("../models");
const Product = db.products;


exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    ownerId: req.body.ownerId,
    categories: req.body.categories,
    description: req.body.description,
    available: req.body.available ? req.body.available : false
  });

  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Product.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message:` Not found Product with id + ${id} `});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: `Error retrieving Product with id= + ${id} `});
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Product with id=${id}. Maybe Product was not found!`
            });
          } else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Product with id=" + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        } else {
          res.send({
            message: "Product was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Product were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    });
};

exports.findAllPublished = (req, res) => {
    Product.find({ available: true })
      .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};