"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createRestaurant } from "../../api/restaurants";

// Define the validation schema using Yup
const CreateRestaurantSchema = Yup.object().shape({
  name: Yup.string().required("Restaurant Name Required"),
  /*location: Yup.number()
    .typeError("Must be a number")
    .required("Restaurant Location Required"),*/
  location: Yup.string().required("location Name Required"),
});

const CreateRestaurant: FC = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      // Redirect or perform some action after successful submission
      router.push("/success-page"); // replace with your desired route
    },
    onError: (error: any) => {
      // Handle the error appropriately
      console.error("Error creating restaurant:", error.message);
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        location: "",
      }}
      validationSchema={CreateRestaurantSchema}
      onSubmit={(values) => {
        console.log(values);
        mutation.mutate(values);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className="flex justify-center items-center  bg-base">
          <Form className="w-96 p-8 shadow-lg rounded-lg bg-base2 text-text border border-borderBase">
            <h2 className="text-3xl font-bold mb-6 text-textMain text-center">
              Create Restaurant
            </h2>

            {/* Restaurant Name */}
            <div>
              <label htmlFor="name" className="text-textMain mb-2 block">
                Restaurant Name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Name"
                className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 border-none bg-inputMain"
              />
              <ErrorMessage
                name="name"
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

            <button
              type="submit"
              className="w-full p-3 mt-3 bg-grey6 text-textMain rounded hover:bg-grey7 transition"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Saving..." : "Create"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateRestaurant;
