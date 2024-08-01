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
      onSubmit={(values) => {
        // Handle form submission
        //alert(location);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className="flex justify-center items-center h-screen bg-bg">
          <form
            onSubmit={handlecreate}
            className="w-96 p-8 shadow-lg rounded-lg bg-card-bg text-text border border-border"
          >
            <h2 className="text-3xl font-bold mb-6 text-accent text-center">
              Create Restaurant
            </h2>
            <div>
              <Field
                name="restaurantName"
                placeholder="Name"
                //'onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-gray-600 dark:border-gray-500"
              />
              <ErrorMessage
                name="restaurantName"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>
            <div>
              <Field
                name="location"
                placeholder="Location"
                //'onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-gray-600 dark:border-gray-500"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>
            <div>
              <Field
                name="owner"
                placeholder="Owner"
                //'onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-gray-600 dark:border-gray-500"
              />
              <ErrorMessage
                name="owner"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>
            <div className="">
              <label htmlFor="employees">Employees: {values.employees}</label>
              <br />
              <Field
                name="employees"
                type="range"
                min="0"
                max="100"
                step="1"
                value={values.employees}
                // onChange={(event) =>setFieldValue("volume", event.target.value) }
                className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-gray-600 dark:border-gray-500"
              />
              <ErrorMessage
                name="employees"
                component="div"
                className="text-red-500 mb-3"
              />
            </div>

            <div>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer"
              >
                <input {...getInputProps()} />

                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag and drop some files here, or click to select files</p>
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
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-3 bg-button text-white rounded hover:bg-red-700 transition"
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
