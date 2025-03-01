//  {
//     price:,
//     name:,
//     description,
//     imageUrl,
//     stock,
//     seller,
//     category
//  }

import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const SUPPORTED_EXTENSIONS = ["jpeg", "jpg", "png"];
export const productSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the product name"),
  price: Yup.string().required("Please enter price"),
  description: Yup.string().required("Please enter the description"),
  imageUrl: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported File Format", (value) => {
      if (!value) return false;

      // Check MIME type first
      if (SUPPORTED_FORMATS.includes(value.type)) {
        return true;
      }
      // console.log(value);
      // If MIME type is not reliable, check the file extension
      const fileName = value;
      // console.log(fileName);
      const fileExtension = fileName.split(".").pop().toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(fileExtension);
    }),
  stock: Yup.string().required("Please enter the stock "),
  category: Yup.string().required("Please enter the category"),
  seller: Yup.string().required("Please enter the seller"),
});
