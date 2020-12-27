const express = require("express");
const festival = require("./greetings/greetings");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

app.use(express.static("public"));

app.get("/api/v1/:festival", (req, res) => {
  try {
    const fest = req.params.festival;
    if (!festival[fest]) {
      res.status(404).json({
        status: "Wrong festival name",
      });
      return;
    }
    console.log(fest);

    let rnoArray = [];
    let rNoImgArray = [];

    while (rnoArray.length < 4) {
      let rno = Math.floor(Math.random() * festival[fest].length);
      if (rnoArray.indexOf(rno) === -1) rnoArray.push(rno);
    }
    console.log(rnoArray + " ye hai apna array");
    while (rNoImgArray.length < 3) {
      let rImgNo = Math.floor(Math.random() * 4 + 1);
      if (rNoImgArray.indexOf(rImgNo) === -1) rNoImgArray.push(rImgNo);
    }

    const greetings = [
      festival[fest][rnoArray[0]],
      festival[fest][rnoArray[1]],
      festival[fest][rnoArray[2]],
      festival[fest][rnoArray[3]],
    ];

    res.status(200).json({
      status: "Success",
      greetings: greetings,
      cardUrls: [
        `http://localhost:${port}/images/${fest}/${rNoImgArray[0]}.jpg`,
        `http://localhost:${port}/images/${fest}/${rNoImgArray[1]}.jpg`,
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Failed",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
