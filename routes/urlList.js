const express = require("express");
const UrlList = require("../models/urlListModel");

// create router instance
const router = express.Router();

// get all Urls
router.get("/", async (req, res) => {
  try {
    const urlList = await UrlList.find({});
    res.status(200).json(urlList);
  } catch (error) {
    res.status(400).json({ ErroMessage: error.massage });
  }
});

// add a URL
router.post("/", async (req, res) => {
  const { originalUrl } = req.body;

  const shortenedUrl = Math.floor(Math.random() * 1001);

  try {
    const urlList = await UrlList.create({ originalUrl, shortenedUrl });
    res.status(200).json(`http://localhost:5000/api/shorturl/${shortenedUrl}`);
  } catch (error) {
    res.status(400).json({ mssg: error.message });
  }
});

// use the shortened link
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const urlList = await UrlList.find().where("shortenedUrl").equals(id);
    const redirectUrl = urlList[0].originalUrl;
    res.redirect(`${redirectUrl}`);
    // res.status(200).send(urlList[0].originalUrl)
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: error.massage,
    });
  }
});

// export router
module.exports = router;
