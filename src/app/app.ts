import express, { NextFunction, Request, Response } from "express";
import { json } from "stream/consumers";
const app = express();
const port = 3000;

// router
const createRouter = express.Router();

app.use("/", createRouter);

createRouter.get(
  "/api/v1/users/create-users",
  (req: Request, res: Response) => {
    const user = req.body;

    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);

// parsers
app.use(express.json());
app.use(express.text());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Hello world !");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: "Successfully receive data",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Not found",
  });
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(400).json({
      success: false,
      message: "Fail to get data",
    });
  }
});

export default app;
