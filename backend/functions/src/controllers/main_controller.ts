import { Response, Request } from "express";
import { db } from ".././config/firebase";
import * as functions from "firebase-functions";
import { ITEM_VALUES, ITEM } from "../../../database/schema"

const NewItem = async (req: Request, res: Response) => {
  const { name, cost, quantity } = req.body;

  try {
    const item = db.collection("items").doc();

    const itemObject: ITEM_VALUES = {
        name,
        cost,
        quantity,
        created: Date.now(),
        updated: Date.now()
    }

    await item.set(itemObject);

    res.status(200).send({
      status: "success",
      message: "added item",
      data: ([item.id, itemObject]),
    });
  } catch (err) {
    // TODO: resolve err type
    if (err instanceof Error) {
      res.status(500).json(err.message);
      functions.logger.error(err.message, { structuredData: true });
    } else {
      res.status(500).json({ error: "Unknown Error" });
      functions.logger.error(err, { structuredData: true });
    }
  }
};

const GetItems = async (req: Request, res: Response) => {
  try {
    // make this a const somewhere
    const items: ITEM = {}
    const querySnapshot = await db.collection("items").get();

    querySnapshot.forEach((doc: any) => items[doc.id] = doc.data());

    res.status(200).json(items);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
      functions.logger.error(err.message, { structuredData: true });
    } else {
      res.status(500).json({ error: "Unknown Error" });
      functions.logger.error(err, { structuredData: true });
    }
  }
};

const UpdateItem = async (req: Request, res: Response) => {
    functions.logger.error("hiiii");
    console.log("here 0")
  const itemId: string = req.query.itemId as string;
  const body = req.body;

  try {
    console.log("here 1")
    const item = db.collection("items").doc(itemId);
    console.log("here 2")

    const currentDoc = await item.get()

    const currentData = currentDoc.data() || {};
    const docId = currentDoc.id
    console.log("here 3")

    const newData: ITEM_VALUES = {
        name: body.name || currentData.name,
        cost: body.cost || currentData.cost,
        quantity: body.quantity || currentData.quantity,
        updated: Date.now(),
        created: currentData.created
    }

    await item.set( newData );

    //keep track of history

    // const oldItem = db
    // .collection("items")
    // .doc(docId)
    // .collection(ITEM_VERSIONS_SUBCOLLECTION_NAME)
    // .doc(currentData.created)

    // const oldData: ITEM_VERSION_VALUES = {
    //     name: currentData.name,
    //     cost: currentData.cost,
    //     quantity: currentData.quantity,
    // }

    // await oldItem.set(oldData);

    res.status(200).json({
      status: "success",
      message: "item updated",
      updates_item: ([docId, newData]),
    //   old_item: ([docId, oldData])
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
      functions.logger.error(err, { structuredData: true });
    } else {
      res.status(500).json({ error: "Unknown Error" });
      functions.logger.error(err, { structuredData: true });
    }
  }
};

const DeleteItem = async (req: Request, res: Response) => {
  const itemId: string = req.query.itemId as string;

  try {
    const item = db.collection("items").doc(itemId);

    await item.delete();

    res.status(200).json({
      status: "success",
      message: "item deleted",
      item: item,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
      functions.logger.error(err.message, { structuredData: true });
    } else {
      res.status(500).json({ error: "Unknown Error" });
      functions.logger.error(err, { structuredData: true });
    }
  }
};

export { NewItem, GetItems, UpdateItem, DeleteItem };
