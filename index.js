const fs = require("fs"),
  app = require("express")(),
  cors = require("cors");
(mongoose = require("mongoose")),
  (mongoUri =
    "mongodb+srv://laaw:mongoDatabase@cluster0.gsmtxwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.use(
  require("body-parser").urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(require("body-parser").json());

const loadEndpoints = (path = "./routes") => {
  fs.readdirSync(path).forEach((dirs) => {
    const dir = fs
      .readdirSync(`${path}/${dirs}`)
      .filter((files) => files.endsWith(".js"));
    for (const files of dir) {
      const file = require(`${path}/${dirs}/${files}`);
      switch (file.method) {
        case "get":
          app.get(`/api${file.endpoint}`, async (req, res) => {
            await file.exec(req, res);
          });
          console.log(file.endpoint);
          break;
        case "post":
          app.post(`/api${file.endpoint}`, async (req, res) => {
            await file.exec(req, res);
          });
          console.log(file.endpoint);
          break;
      }
    }
  });
};

const loadApi = (port) => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};

const loadDatabase = async (url) => {
  mongoose
    .connect(url, {})
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

loadApi("3000");
loadEndpoints();
loadDatabase(mongoUri);
