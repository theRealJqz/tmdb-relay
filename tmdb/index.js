const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


const fetchContent = async (searchtext) => {
    const url = `https://api.themoviedb.org/3/`
    const endPoint = searchtext.replace("!api_key=KEY", `?api_key=${process.env.TMDB_API_KEY}`);
    try {
      const dataStream = await fetch(url+endPoint);
      const dataJson = await dataStream.json();
      return dataJson;
    } catch (err) {
      return { Error: err.stack };
    }
  };
router.get("/", (req, res) => {//user get request
    res.json({ success: "Hello db folder!" });
  });
router.get("/*?", async (req, res) => {
  const searchtext = req.params[0];
  if(searchtext.includes("authentication" || "account" || "accounts")){
    return res.json("NOT VALID")
  }
  const data = await fetchContent(searchtext);
  res.json(data);
});
// router.post("/", async (req, res) => {//user post
//   const searchtext = req.body;
//   const data = await fetchContent(searchtext);
//   res.json(data);
// });

module.exports = router;
