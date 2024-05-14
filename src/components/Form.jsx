import React, { useState } from "react";

const Form = () => {
  const intialValues = { username: "", email: "", password: "" };

  const [formvalidation, setFormvalidation] = useState(intialValues);
  const [formError, setFormErrors] = useState({});
  const [submitform, setSubmitForm] = useState(false);
  function handlechange(e) {
    const { name, value } = e.target;
    setFormvalidation((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(formvalidation));
    setSubmitForm(true);
  }

  function validate(values) {
    const error = {};
    const regex = /.+@[^@]+\.[^@]{2,}$/;

    if (!values.username) {
      error.username = "username is required";
    }
    if (!values.email) {
      error.email = "email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Email is not valid";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "password must have min 4 character";
    } else if (values.password.length > 4) {
      error.password = "password must have max 10 character only..";
    }
    return error;
  }
  return (
    <div className="h-screen bg-sky-400 flex items-center flex-col justify-center">
      {Object.keys(formError).length === 0 && submitform ? (
        <div className="text-lg p-2 mb-2 bg-sky-300">Signed in success</div>
      ) : (
        <pre className="text-lg p-4 bg-gray-300 font-bold">
          {JSON.stringify(formvalidation, undefined, 2)}
        </pre>
      )}

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative border-2 border-black flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold p-2 border-b-2 text-center border-black">
          React Form
        </h1>
        <div className="px-4  flex flex-col">
          <label htmlFor="username">UserName</label>
          <input
            name="username"
            type="text"
            className="rounded-md px-4 text-lg "
            id="username"
            value={formvalidation.username}
            onChange={handlechange}
          />
          <p className="text-red-600 font-bold capitalize">
            {formError.username}
          </p>
        </div>
        <div className="px-4  flex flex-col">
          <label htmlFor="Email">Email</label>
          <input
            name="email"
            type="email"
            onChange={handlechange}
            className="rounded-md px-4 text-lg "
            id="Email"
            formNoValidate
          />
          <p className="text-red-600 font-bold capitalize">{formError.email}</p>
        </div>
        <div className="px-4  flex flex-col">
          <label htmlFor="password">password</label>
          <input
            name="password"
            type="password"
            onChange={handlechange}
            className="rounded-md px-4 text-lg "
            id="password"
          />
          <p className="text-red-600 font-bold capitalize">
            {formError.password}
          </p>
        </div>
        <div className="flex justify-center p-2">
          <button className="rounded-lg bg-sky-500 px-2 py-1 font-semibold w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
