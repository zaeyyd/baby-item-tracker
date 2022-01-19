import * as functions from "firebase-functions";
import * as express from "express";

import { DeleteItem, GetItems, NewItem, UpdateItem } from "./controllers/main_controller";
import { validate } from "./middleware/request_validation";
import { DeleteItemSchema, NewItemSchema, UpdateItemSchema  } from "./endpoint_schemas/_index";

const app = express();

app.get("/ping", (req, res) => res.status(200).send("yeo"));

// TODO: validate middleware
app.post("/new_item", validate(NewItemSchema), NewItem);
app.post("/update_item", validate(UpdateItemSchema), UpdateItem);
app.delete("/item", validate(DeleteItemSchema), DeleteItem);

app.get("/items", GetItems);

exports.api = functions.https.onRequest(app);








// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs! Zayyed", {structuredData: true});
//   response.send("Hello from Firebase Zayyed");
// });
