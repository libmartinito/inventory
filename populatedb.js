#! /usr/bin/env node

// the first line on unix-like systems tell the system what
// interpreter to pass that file to for execution

console.log("This script populates the items and categories to your database.");

// get arguments passed on command line
const userArgs = process.argv.slice(2);

// argv is a method called on process, a global node object
// and it returns an array of arguments passed in a command
// line

// slice is a method called on an array that returns a
// shallow copy of a portion of an array into a new array
// object from start and end (end not included)

const async = require("async");
const Item = require("./models/item");
const Category = require("./models/category");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// usenewurlparser is to avoid errors from using the old
// url used by mongodb when connecting to it

// useunifiedtopology is an option to use mongodb driver's new
// connection management engine

mongoose.Promise = global.Promise;

// setting mongoose.promise to global.promise is a legacy
// code not needed from mongoose 5 onwards. this is because
// mongoose 4 relied on itw own promise implementation

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [];
const categories = [];

const itemCreate = (name, description, category, price, numberInStock, cb) => {
  itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    numberInStock: numberInStock,
  };

  const item = new Item(itemDetail);

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
};

const categoryCreate = (name, description, cb) => {
  categoryDetail = {
    name: name,
    description: description,
  };

  const category = new Category(categoryDetail);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
};

const createCategories = () => {
  async.series([
    (callback) => {
      categoryCreate(
        "Upgrade",
        "Items used to enhance your status such as health, soul and your equipment.",
        callback
      );
    },
    (callback) => {
      categoryCreate(
        "Trade",
        "Items that can be exchanged into Geo.",
        callback
      );
    },
    (callback) => {
      categoryCreate(
        "Quest",
        "Items that are used as an aid to traverse and explore the depths of Hallownest.",
        callback
      );
    },
    (callback) => {
      categoryCreate(
        "Key",
        "Items that are used to unlock certain doors within Hallownest.",
        callback
      );
    },
    (callback) => {
      categoryCreate(
        "Charm",
        "These are special items that provide you with buffs that help with both traversing Hallownest and battling its foes.",
        callback
      );
    },
  ]);
};

const createItems = () => {
  async.parallel([
    (callback) => {
      itemCreate(
        "Gathering Swarm",
        "A swarm will follow the bearer and gather up any loose Geo. Useful for those who can’t bear to leave anything behind, no matter how significant.",
        categories[4],
        300,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Stalwart Shell",
        "Builds resilience. When recovering from damage, the bearer will remain invulnerable for longer. Makes it easier to escape from dangerous situations.",
        categories[4],
        200,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Sprintmaster",
        "Bears the likeness of a strange bug known only as ‘The Sprintmaster’. Increases the running speed of the bearer, allowing them to avoid danger or overtake rivals.",
        categories[4],
        400,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Heavy Blow",
        "Farmed from the nails of fallen warriors. Increase the force of the bearer’s nail, causing enemies to recoil further when hit.",
        categories[4],
        350,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Lumafly Lantern",
        "Crystal lantern ocntaining a Lumafly. Brightens dark caverns so wanderers can find their way.",
        categories[2],
        1800,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Simple Key",
        "Simply, a simple key. It will fit a variety of locks, which is useful if you like to poke around in places you don’t belong.",
        categories[3],
        950,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Elegant Key",
        "An explorer found this fancy key floating in the waterways of the city far below us. I’ve not cleaned it.",
        categories[3],
        800,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Rancid Egg",
        "Fatty, rancid egg of an unknown creature.",
        categories[1],
        60,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Mask Shard",
        "A shard of an ancient mask, worn to protect oneself from harm.",
        categories[0],
        150,
        1,
        callback
      );
    },
    (callback) => {
      itemCreate(
        "Vessel Fragment",
        "Fragment of a white vessel made to contain soul.",
        categories[0],
        900,
        1,
        callback
      );
    },
  ]);
};

async.series(
  [createCategories, createItems],

  (err, results) => {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // all done, disconnect from database
    mongoose.connection.close();
  }
);
