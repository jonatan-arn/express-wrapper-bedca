var express = require("express");
var router = express.Router();
var axios = require("axios");
var https = require("https");
const {
  xmlToObejct,
  url,
  foodGroupsXML,
  foodGroupXML,
  foodXml,
  listByNameXml,
} = require("../utils/utils");

/* GET users listing. */
router.get("/allGroups", async function (req, res, next) {
  const agent = new https.Agent({
    rejectUnauthorized: false, // Desactiva la verificación SSL
  });

  const response = await axios.post(url, foodGroupsXML, {
    headers: {
      "Content-Type": "text/xml",
    },
    httpsAgent: agent,
  });
  const data = xmlToObejct(response.data);

  res.status(200).send(data.foodresponse);
});
router.get("/foodByGroup/:id", async function (req, res, next) {
  const id = req.params.id;

  const agent = new https.Agent({
    rejectUnauthorized: false, // Desactiva la verificación SSL
  });
  const xml = foodGroupXML(id);
  const response = await axios.post(url, xml, {
    headers: {
      "Content-Type": "text/xml",
    },
    httpsAgent: agent,
  });

  try {
    const data = xmlToObejct(response.data);
    res.status(200).send(data.foodresponse);
  } catch (error) {
    res.send(response.data);
  }
});

router.get("/byName/:name", async function (req, res, next) {
  const name = req.params.name;
  const agent = new https.Agent({
    rejectUnauthorized: false, // Desactiva la verificación SSL
  });
  //f_eng_name
  const xml = listByNameXml(name, "f_eng_name");

  try {
    const response = await axios.post(url, xml, {
      headers: {
        "Content-Type": "text/xml",
      },
      httpsAgent: agent,
    });
    const xmlObject = xmlToObejct(response.data);
    const food = xmlObject.foodresponse.food;
    console.log(food);
    const data = Array.isArray() ? food : [food];
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.send({ error: error });
  }
});
router.get("/byId/:id", async function (req, res, next) {
  const id = req.params.id;
  const agent = new https.Agent({
    rejectUnauthorized: false, // Desactiva la verificación SSL
  });
  const xml = foodXml(id);
  const response = await axios.post(url, xml, {
    headers: {
      "Content-Type": "text/xml",
    },
    httpsAgent: agent,
  });

  try {
    const data = xmlToObejct(response.data);
    res.status(200).send(data.foodresponse);
  } catch (error) {
    res.send(response.data);
  }
});
module.exports = router;
