let express = require("express");
let db = require("./configs/db");
let user = require("./routes/user.js");
let cors = require("cors");
const bodyParser = require("body-parser");
let axios = require("axios");
const teacher = require("./routes/teacher");


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", user);
app.use("/teacher",teacher);
app.get("/", (req, res) => {
  res.send("Server set");
});

app.post("/runcode", function (req, res) {
  var data = JSON.stringify({
    code: req.body.code,
    language: req.body.language,
    input: req.body.input,
});


  var config = {
    method: "post",
    url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

