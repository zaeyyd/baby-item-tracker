import { object, string } from "yup";


const queryObject = object({
    itemId: string().required("Item ID is required")
})

const DeleteItemSchema = object({
    query: queryObject
})


export { DeleteItemSchema }