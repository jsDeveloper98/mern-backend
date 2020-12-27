const router = require("express").Router();
let Post = require("../models/post");
const {
  findAll,
  findRecord,
  deleteRecord,
  createRecord,
  updateRecord,
} = require("../services/global");

// /posts/
findAll(Post, router);

// /posts/find
findRecord(Post, router);

// /posts/delete
deleteRecord(Post, router);

// /posts/create
createRecord(Post, router);

// /posts/update
updateRecord(Post, router);

module.exports = router;
