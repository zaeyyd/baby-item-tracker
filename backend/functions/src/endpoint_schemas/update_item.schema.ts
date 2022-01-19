import { object, string } from "yup";


const bodyObject = object({
    name: string()
})

const queryObject = object({
    itemId: string().required("Item ID is required")
})

const UpdateItemSchema = object({
    body: bodyObject,
    query: queryObject
})


export { UpdateItemSchema }