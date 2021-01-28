const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const arModel = require('../models/3dModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const items = await arModel.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred', err);
  }
});

router.get('/index', async (req, res) => {
  try {
    const items = await arModel.find();
    res.render('imagesPage', { items });
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred', err);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { name, modelUrl } = req.body;
  const obj = {
    name,
    modelUrl,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '/../uploads/' + req.file.filename)
      ),
      contentType: 'image/png',
    },
  };

  try {
    await arModel.create(obj);
    res.redirect('/armodels/index');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
