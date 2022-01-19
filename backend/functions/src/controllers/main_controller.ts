import { Response, Request } from "express";
import { db } from ".././config/firebase";
import * as functions from "firebase-functions";
import { ITEM } from "../../../database/schema"

const NewItem = async (req: Request, res: Response) => {
  const { name, cost, qunatity } = req.body;

  try {
    const item = db.collection("items").doc();
    const itemObject: ITEM = {
      id: item.id,
      name,
      cost,
      qunatity,
      created: Date.now(),
      updated: Date.now()
    };

    item.set(itemObject);

    res.status(200).send({
      status: "success",
      message: "added item",
      data: itemObject,
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
    const items: Item[] = [];
    const querySnapshot = await db.collection("items").get();

    querySnapshot.forEach((doc: any) => items.push(doc.data()));

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
  const itemId: string = req.query.itemId as string;
  const body = req.body;

  try {
    const item = db.collection("items").doc(itemId);
    const currentData = (await item.get()).data() || {};
    const newItem: Item = {
      name: body.name || currentData.name,
    };

    await item.set({ newItem });

    // keep track of history

    // const oldItem = db.collection("items").doc();
    // const itemObject = {
    //   id: item.id,
    //   name,
    // };

    // item.set(itemObject);

    res.status(200).json({
      status: "success",
      message: "item updated",
      item: newItem,
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
