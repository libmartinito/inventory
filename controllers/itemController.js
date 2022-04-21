const Item = require("../models/item");
const async = require("async");

exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item: (callback) => {
        Item.findById(req.params.id).populate("category").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      res.render("item_detail", {
        items: results.item,
      });
    }
  );
};
