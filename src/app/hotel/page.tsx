"use client";

import React, { useState, FC } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";

// Define the validation schema using Yup
const CreateRestaurantSchema = Yup.object().shape({
  restaurantName: Yup.string().required("Restaurant Name Required"),
  owner: Yup.string().required("Restaurant owner's Name Required"),
  location: Yup.number()
    .typeError("Must be a number")
    .required("Restaurant Location Required"),
  employees: Yup.number().moreThan(0, "Employees must be at least 0"),
  // .max(100, "Employees must be at most 100")
  // .required("employees are required"),
  images: Yup.mixed()
    .required("A file is required")
    .test("fileFormat", "Unsupported Format, only PNG is allowed", (value) => {
      if (!value) {
        return false;
      }
      if (value instanceof File) {
        return value.type === "image/png";
      }
      return false;
    }),
});

const CreateRestaurant: FC = () => {
  const [images, setImages] = React.useState<any[]>([]);
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const newImages = acceptedFiles.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageDelete = (index: Number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
    });

  const handlecreate = (e: React.FormEvent) => {
    e.preventDefault();
    // alert(images);
    // Dummy authentication logic
  };

  return (
    <Formik
      initialValues={{
        restaurantName: "",
        owner: "",
        location: null,
        images: [],
        employees: 1,
      }}
      validationSchema={CreateRestaurantSchema}
      onSubmit={(values: any) => {
        // Handle form submission
        //alert(location);
      }}
    >
      {({ values, setFieldValue, errors, touched }: any) => (
        <div className="flex justify-center items-center  bg-base">
          <form
            onSubmit={handlecreate}
            className="w-96 p-8 shadow-lg rounded-lg bg-base2 text-text border border-borderBase"
          >
            <h2 className="text-3xl font-bold mb-6 text-textMain text-center">
              Create Restaurant
            </h2>

            {/* Restaurant Name */}
            <div>
              <label
                htmlFor="restaurantName"
                className="text-textMain mb-2 block"
              >
                Restaurant Name
              </label>
              <Field
                id="restaurantName"
                name="restaurantName"
                placeholder="Name"
                className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 border-none bg-inputMain"
              />
              <ErrorMessage
                name="restaurantName"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="text-textMain mb-2 block">
                Location
              </label>
              <Field
                id="location"
                name="location"
                placeholder="Location"
                className="w-full mb-4 p-3 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-inputMain"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>

            {/* Owner */}
            <div>
              <label htmlFor="owner" className="text-textMain mb-2 block">
                Owner
              </label>
              <Field
                id="owner"
                name="owner"
                placeholder="Owner"
                className="w-full mb-4 p-3 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-inputMain"
              />
              <ErrorMessage
                name="owner"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>

            {/* Employees */}
            <div>
              <label htmlFor="employees" className="text-textMain mb-2 block">
                Employees: {values.employees}
              </label>
              <Field
                id="employees"
                name="employees"
                type="range"
                min="0"
                max="100"
                step="1"
                value={values.employees}
                className="w-full mb-4 p-3 border-none bg-base2 rounded-md"
              />
              <ErrorMessage
                name="employees"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-textMain mb-2 block">Upload Images</label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-borderBase p-5 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-textMain">Drop the files here ...</p>
                ) : (
                  <p className="text-textMain">
                    Drag and drop some files here, or click to select files
                  </p>
                )}
              </div>
              <div className="flex flex-wrap mt-5">
                {images.map((image, index) => (
                  <div key={index} className="m-2 relative">
                    <Image
                      src={image.preview}
                      alt={`img-${index}`}
                      width="100"
                      height="100"
                      className="w-[137px] h-[137px] object-cover border-2 border-red-600"
                    />
                    <button
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-2 right-2 bg-grey6 text-textMain rounded-md w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-3 bg-grey6 text-textMain rounded hover:bg-grey7 transition"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default CreateRestaurant;
