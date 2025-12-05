import * as yup from "yup";


export const loginSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
});


export const registerSchema = yup.object({
    username: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
});