const express = require("express");
const cors = require("cors");

const {
  createConstructionsRepository,
  createSpecialitiesRepository,
} = require("./repository");

const app = express();

// allow express cors
app.use(cors());

const constructionsRepository = createConstructionsRepository();
const specialitiesRepository = createSpecialitiesRepository();

app.get("/api/v1/construction-companies", (req, res) => {
  const { specialities, search } = req.query;

  let filteredConstructions = constructionsRepository;

  if (specialities) {
    const specialitiesArray = specialities ? specialities.split(",") : [];
    filteredConstructions = filteredConstructions.filter((construction) =>
      specialitiesArray.every((speciality) =>
        construction.speciality.includes(speciality)
      )
    );
  }

  if (search) {
    const searchRegex = new RegExp(search, "i");
    filteredConstructions = filteredConstructions.filter((construction) =>
      construction.name.match(searchRegex)
    );
  }

  res.send(filteredConstructions);
});

app.get("/api/v1/construction-specialities", (req, res) => {
  res.send(specialitiesRepository);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
