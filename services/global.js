const findAll = (model, router) => {
  router.route("/").get((req, res) => {
    model
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json({ message: err.message }));
  });
};

const findRecord = (model, router) => {
  router.route("/find").get((req, res) => {
    const { id } = req.body;

    model
      .findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json({ message: err.message }));
  });
};

const deleteRecord = (model, router) => {
  router.route("/delete").post((req, res) => {
    const { id } = req.body;

    model
      .findByIdAndDelete(id)
      .then(() => res.json({ message: 'Successfully deleted' }))
      .catch((err) => res.status(400).json({ message: err.message }));
  });
};

const createRecord = (model, router) => {
  router.route("/create").post((req, res) => {
    const data = req.body;

    const doc = new model({
      ...data,
    });

    doc
      .save()
      .then(() => res.json({ message: 'Successfully created' }))
      .catch((err) => res.status(400).json({ message: err.message }));
  });
};

const updateRecord = (model, router) => {
  router.route("/update").post((req, res) => {
    const { id, updates } = req.body;

    model
      .findById(id)
      .then((data) => {
        data = { id, ...updates };

        data
          .save()
          .then(() => res.json({ message: 'Successfully updated' }))
          .catch((err) => res.status(400).json({ message: err.message }));
      })
      .catch((err) => {
        res.status(400).json(`Error: ${err}`);
      });
  });
};

module.exports = {
  findAll,
  findRecord,
  deleteRecord,
  createRecord,
  updateRecord,
};
