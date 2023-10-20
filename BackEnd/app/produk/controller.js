const path = require("path");
const fs = require("fs");
const config = require("../config");
const Product = require("./model");
const Category = require("../category/model");
const Tags = require("../tags/model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });

      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    const tagsName = payload.tags[0].split(",").map((tag) => tag.trim());
    console.log(tagsName);
    if (Array.isArray(tagsName) && tagsName.length > 0) {
      let tags = await Tags.find({
        name: { $in: tagsName },
      });
      console.log(tags);
      if (tags.length > 0) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      } else {
        delete payload.tags;
      }
    }
    if (req.file) {
      let temp_path = req.file.path;
      let originalExtension =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originalExtension;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/product/${filename}`
      );

      const src = fs.createReadStream(temp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = new Product({
            ...payload,
            picture: `http://localhost:5000/images/product/${filename}`,
          });
          await product.save();
          return res.json(product);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
          next(err);
        }
      });

      src.on("error", (err) => {
        next(err);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
  } catch (err) {
    console.log(err);
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
};
const getProducts = async (req, res, next) => {
  try {
    let { skip = 0, limit = 200, q = "", category = "", tags = [] } = req.query;
    let criteria = {};
    if (q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: "i" },
      };
    }
    if (category.length) {
      let categoryResult = await Category.findOne({
        name: { $regex: category, $options: "i" },
      });
      if (categoryResult) {
        criteria = { ...criteria, category: categoryResult._id };
      }
    }
    if (tags.length) {
      let tagsResult = await Tags.find({ name: { $in: tags } });
      if (tagsResult.length > 0) {
        criteria = {
          ...criteria,
          tags: { $in: tagsResult.map((tag) => tag._id) },
        };
      }
    }

    let products = await Product.find(criteria)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("category")
      .populate("tags");

    if (products.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    return res.json({ data: products });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Kesalahan internal server" });
  }
};
const get_BayID = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    res.status(500);
    return res.json({ error: "Kesalahan internal server" });
  }
};
const update = async (req, res, next) => {
  try {
    let payload = req.body;

    let { id } = req.params;

    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    if (Array.isArray(payload.tags) && payload.tags.length > 0) {
      let tags = await Tags.find({
        name: { $in: payload.tags },
      });

      if (tags.length > 0) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      } else {
        delete payload.tags;
      }
    }

    if (req.file) {
      let temp_path = req.file.path;
      let originalExtension =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originalExtension;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/product/${filename}`
      );

      const src = fs.createReadStream(temp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = await Product.findByIdAndUpdate(
            id,
            {
              ...payload,
              picture: `http://localhost:5000/images/product/${filename}`,
            },
            { new: true, runValidators: true }
          );
          console.log(product);
          if (!product) {
            fs.unlinkSync(target_path);
            return res.status(404).json({ error: "Product not found" });
          }
          res.json(product);
        } catch (err) {
          console.log(err,"NI===============");
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
          if (err && err.code === 11000) {
            return res.status(409).json({
              error: 1,
              message: "Conflict: Duplicate entry",
            });
          }
          next(err);
        }
      });

      src.on("error", (err) => {
        next(err);
      });
    } else {
      payload.picture = null;
      let product = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Find the existing product by ID
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the image file, if it exists
    if (product.picture) {
      const imagePath = path.resolve(
        config.rootPath,
        `public/images/product/${path.basename(product.picture)}`
      );
      fs.unlinkSync(imagePath);
      product.picture = null;
      await product.save();
    }

    return res.json({ message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
};
const deletes = async (req, res, next) => {
  try {
    const productId = req.params.id;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await Product.findByIdAndDelete(productId);
    return res.json({ message: "product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  store,
  getProducts,
  update,
  deleteImage,
  deletes,
  get_BayID,
};
