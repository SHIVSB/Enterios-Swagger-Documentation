import express, { Application, Request, Response, NextFunction } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "morgan";
import cors from "cors";
const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Enterios swagger documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:7071/api/",
        description: "Development server",
      },
      // {
      //   url: "yet to be published",
      //   description: "Production Server",
      // },
    ],
  },
  apis: ["swagger.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

const app: Application = express();

app.use(logger("dev"));
app.use(cors({ origin: '*'}));

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/", (req: Request, res: Response) => {
//   res
//     .status(200)
//     .send(
//       "This is the Enterios-Severless Swagger documentation server. Happy Hacking!"
//     );
// });

app.listen(PORT, () => {
  console.log(
    "This is the Enterios-Severless Swagger documentation server. Happy Hacking!"
  );
  
  console.log(`Server running on port : ${PORT}`);
});
