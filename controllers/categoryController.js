const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");

// display a list of all categories

exports.index = (req, res) => {
  // the find function takes three parameters: one for filtering
  // the documents, one for the query projection (what fileds are
  // included), and another for other options such as limit or skip
  Category.find({}, "name")
    .sort({ name: 1 })
    .exec((err, list_categories) => {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "HallowList Home",
        category_list: list_categories,
      });
    });
};

// display the detail page for a specific category

exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category: (callback) => {
        Category.findById(req.params.id).exec(callback);
      },
      items: (callback) => {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      res.render("category_detail", {
        title: results.category.name,
        description: results.category.description,
        items_list: results.items,
      });
    }
  );
};
