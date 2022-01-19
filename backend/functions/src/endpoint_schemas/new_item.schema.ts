import { number, object, string } from "yup";


const bodyObject = object({
    name: string().required("Name is required"),
    quantity: number().required("Quanitity is required"),
    cost: number().required("Cost is required")
})

const NewItemSchema = object({
    body: bodyObject
})


export { NewItemSchema }