import * as yup from "yup";

export const schema = yup
  .object({
    email: yup
      .string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("E-mail is required"),
    password: yup.string().required("Please Enter your password"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
  })
  .required();
