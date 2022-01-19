import { object, string } from "yup";


const bodyObject = object({
    name: string().required("Name is required"),
    quantity: string().required("Quanitity is required"),
    cost: string().required("Cost is required")
})

const NewItemSchema = object({
    body: bodyObject
})


export { NewItemSchema }