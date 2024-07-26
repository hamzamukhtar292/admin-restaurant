"use client";

import React, { useCallback, useState, FC } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
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
      // Check if value is null or undefined, and handle it appropriately
      if (!value) {
        return false; // Return false if no file is provided
      }
      // Check if the value is a File object
      if (value instanceof File) {
        return value.type === "image/png";
      }
      return false;
    }),
});

const CreateRestaurant: FC = () => {
  const [files, setFiles] = React.useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState([]);
  const router = useRouter();

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.type === "image/png"
      );

      if (
        fileRejections.length > 0 ||
        validFiles.length !== acceptedFiles.length
      ) {
        setFiles([]);
      } else {
        const filePreviews = validFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setFiles(filePreviews);
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
    },
  });

  const handlecreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log();
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
        console.log(values);
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

            <div
              {...getRootProps({
                className:
                  "dropzone border-2 border-dashed border-gray-400 rounded p-5 cursor-pointer",
              })}
            >
              <input
                {...getInputProps()}
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  setFieldValue("images", files ? files[0] : null);
                }}
              />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop some files here, or click to select files </p>
              )}
              <div>
                {files.map(({ file, preview }) => (
                  <div key={file.name} className="my-2">
                    <Image
                      src={preview}
                      alt={file.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover"
                    />
                    <p>{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-button text-white rounded hover:bg-red-700 transition"
            >
              Create{" "}
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default CreateRestaurant;
