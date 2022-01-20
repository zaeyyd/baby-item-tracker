import * as functions from "firebase-functions";
import * as express from "express";

import {
  DeleteItem,
  GetItems,
  NewItem,
  UpdateItem,
} from "./controllers/main_controller";
import { validate } from "./middleware/request_validation";
import {
  DeleteItemSchema,
  NewItemSchema,
  UpdateItemSchema,
} from "./endpoint_schemas/_index";

const router = express.Router();

router.get("/ping", (req, res) => res.status(200).send("yeo"));

router.get("/pingt", (req, res) => res.status(200).send("yeooo"));

// TODO: validate middleware
router.post("/new_item", validate(NewItemSchema), NewItem);
router.post("/update_item", validate(UpdateItemSchema), UpdateItem);
router.delete("/item", validate(DeleteItemSchema), DeleteItem);
router.get("/items", GetItems);

const app = express();
app.use(router);
exports.api = functions.https.onRequest(app);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs! Zayyed", {structuredData: true});
//   response.send("Hello from Firebase Zayyed");
// });
