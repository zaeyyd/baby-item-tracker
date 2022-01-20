// items collections schemas
export const ITEMS_COLLECTION_NAME = "items";

export interface ITEM {
  [itemId: string]: ITEM_VALUES;
}

export interface ITEM_VALUES {
  name: string;
  cost: number;
  quantity: number;
  created: number;
  updated: number;
}

// item_histories collection schemas
export const ITEM_HISTORIES_COLLECTION_NAME = "item_histories";
export const ITEM_VERSIONS_SUBCOLLECTION_NAME = "versions";

export type ITEM_VERSION_VALUES = Omit<ITEM_VALUES, "created" | "updated">;

export interface ITEM_VERSION {
  [created: number]: ITEM_VERSION_VALUES;
}

export interface ITEM_HISTORY {
  [itemId: string]: { versions: ITEM_VERSION };
}
