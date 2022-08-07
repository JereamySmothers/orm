const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [ProductTag, Product],
  })
  .then((dbTagData) => res.json(dbTagData))
  if (err) throw err;
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [ProductTag, Product],
  })
  .then((dbTagData) => res.json(dbTagData))
  if (err) throw err;
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name,
  })
  .then((dbTagData) => res.json(dbTagData))
  if (err) throw err;
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id,
    },
  })
    .then((Tag) => {
      const categories = Tag.map(({ tag_id }) => tag_id);
      const newCategories = req.body.tag_id
        .filter((tag_id) => !tag_id.includes(tag_id))
        .map((tag_id) => {
          return {
            tag_id: req.params.tag_id,
            tag_id,
          };
        });
      if (!dbTagData) {
        res.status(404).json({ message: 'NO TAG FOUND WITH CORRESPONDING ID' });
        return;
      }
      res.json(dbTagData);
    })
  if (err) throw err;
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'NO Tag FOUND WITH CORRESPONDING ID' });
          return;
        }
        res.json(dbTagData);
      })
    if (err) throw err;
});

module.exports = router;
