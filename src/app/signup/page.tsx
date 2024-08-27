"use client";

import React, { useState, FC } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Define the validation schema using Yup
const CreateSigUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  subscription: Yup.string().required("Subscription is required"),
});

const subscription = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
];

const SignUp: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        subscription: "",
      }}
      validationSchema={CreateSigUpSchema}
      onSubmit={(values) => {
        // Handle form submission
        console.log(values);
      }}
    >
      {() => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base">
          <Form className="w-96 p-8 shadow-lg rounded-lg bg-card-bg text-text border border-border">
            <h2 className="text-3xl font-bold mb-6 text-accent text-center">
              Sign Up
            </h2>
            <div className="mb-4">
              <Field
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-600 dark:border-gray-500"
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="firstName" />
              </div>
            </div>
            <div className="mb-4">
              <Field
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-600 dark:border-gray-500"
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="lastName" />
              </div>
            </div>
            <div className="mb-4">
              <Field
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-600 dark:border-gray-500"
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="relative mb-4">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-600 dark:border-gray-500"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="relative mb-4">
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-600 dark:border-gray-500"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="subscription"
                className="block mb-1 text-lg font-medium"
              >
                Subscription:
              </label>
              <Field
                as="select"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-600 dark:border-gray-500 bg-white text-gray-900"
                name="subscription"
              >
                <option
                  value=""
                  label="Select Subscription"
                  className="text-gray-500"
                />
                {subscription.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </Field>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="subscription" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-grey6 text-white rounded-md transition"
            >
              Sign Up
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
