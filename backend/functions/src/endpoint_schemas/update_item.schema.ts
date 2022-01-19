import { number, object, string } from "yup";


const bodyObject = object({
    name: string(),
    cost: number(),
    quantity: number()

})

const queryObject = object({
    itemId: string().required("Item ID is required")
})

const UpdateItemSchema = object({
    body: bodyObject,
    query: queryObject
})


export { UpdateItemSchema }