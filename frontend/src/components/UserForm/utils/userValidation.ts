import * as Yup from "yup";

const now = new Date();
const maxDate = new Date(now.setFullYear(now.getFullYear() - 18));
const minDate = new Date(now.setFullYear(now.getFullYear() - 100));

export const userValidation = new Yup.ObjectSchema({
  lastName: Yup.string().required("User last name is required!"),
  firstName: Yup.string().required("User first name is required!"),
  residence: Yup.string().required("User residence is required!"),
  dateOfBirthday: Yup.date()
    .max(maxDate, "User must be at least 18 years old!")
    .min(minDate, "Invalid birth date!")
    .required("User birth date is required!"),
});
