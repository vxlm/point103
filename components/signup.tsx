import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import { Button } from "./button";
const SignupForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    contactNumber: "",
    linkedInProfile: "",
    email: "",
    experiences: [{ position: "", company: "", startDate: "", endDate: "" }],
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...formState.experiences];
    experiences[index][name] = value;
    setFormState({ ...formState, experiences });
  };

  // Formats date to MM/YYYY format
  const handleDateChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...formState.experiences];

    let formattedDate = value.replace(/\D/g, ""); // Remove non-numeric characters

    // Use regular expression to add slashes
    formattedDate = formattedDate.replace(/^(\d{2})/, "$1/");

    experiences[index][name] = formattedDate;
    setFormState({ ...formState, experiences });
  };

  const addExperience = () => {
    setFormState({
      ...formState,
      experiences: [
        ...formState.experiences,
        { position: "", company: "", startDate: "", endDate: "" },
      ],
    });
  };
  const removeExperience = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      experiences: prevState.experiences.filter((_, expIndex) => expIndex !== index),
    }));
  };
  const handleCheckboxChange = () => {
    setFormState(prevState => ({
      ...prevState,
      agreedToTerms: !prevState.agreedToTerms,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.agreedToTerms) {
      alert("You must agree to the terms of service before submitting.");
      return;
    }
    try {
      const response = await fetch("https://api.point103.com/add_profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      alert("Success! We'll reach out to you shortly");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  }
  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto max-w-screen-lg">
          <div>
            <div className="shadow-lg mb-6 rounded p-4 px-4 md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="text-lg font-medium">Personal Details</p>
                  <p>Join us today!</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label>Your Name</label>
                      <input
                        className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey"
                        name="name"
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label>Contact number</label>
                      <input
                        className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey" 
                        name="contactNumber"
                        onChange={handleChange}
                        placeholder="Contact Number"
                        required
                        type="text"
                        value={formState.contactNumber}
                      />
                    </div>


                    <div className="md:col-span-2">
                      <label>Linkedin Profile</label>
                      <input
                        className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey"
                        name="linkedInProfile"
                        onChange={handleChange}
                        placeholder="Linkedin Profile"
                        required
                        type="text"
                        value={formState.linkedInProfile}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label>Email </label>
                      <input
                        className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey" 
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        type="text"
                        value={formState.email}
                      />
                    </div>
                    <div className="mt-5 md:col-span-3">
                      <span className="text-lg">Work Experience</span>
                    </div>

                    {formState.experiences.map((exp, index) => (
                      <React.Fragment key={index}>
                        <div className=" md:col-span-3">
                          <label>Company</label>
                          <input
                            className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey"
                            name="company"
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Company"
                            type="text"
                            value={exp.company}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label>Position</label>
                          <input
                            className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey"
                            name="position"
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Position"
                            type="text"
                            value={exp.position}
                          />
                        </div>

                        <div className="md:col-span-5">
                          <div className="inline-flex items-center">
                            <div className="mr-5 w-4/12">
                              <label>Start (MM/YYYY)</label>
                              <div className="inline-flex items-center">
                                <input
                                  className={styles.input}
                                  maxLength={7}
                                  name="startDate"
                                  onChange={(e) => handleDateChange(index, e)}
                                  placeholder="Start (MM/YYYY)"
                                  type="text"
                                  value={exp.startDate}
                                />
                              </div>
                            </div>
                            <div className="w-4/12">
                              <label>End (MM/YYYY)</label>
                              <input
                                className={styles.input}
                                maxLength={7}
                                name="endDate"
                                onChange={(e) => handleDateChange(index, e)}
                                placeholder="End (MM/YYYY)"
                                type="text"
                                value={exp.endDate}
                              />
                            </div>
                          </div>
                          {index === formState.experiences.length - 1 ? (
                            <Button
                              className="translate-y-[-1rem] animate-fade-in opacity-0"
                              onClick={addExperience}
                              size="small"
                              type="button"
                              variant="secondary"
                            >
                              Add Another Job
                            </Button>
                          ) : (
                            <Button
                              className="translate-y-[-1rem] animate-fade-in opacity-0"
                              size="small"
                              type="button"
                              variant="secondary"
                              onClick = {() =>  removeExperience(index)}
                            >
                              Remove Job
                            </Button>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
  <div className="text-left md:col-span-5">                  
        <input
          type="checkbox"
          id="terms"
          checked={formState.agreedToTerms}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="terms"> I have read and agree to the <a href="terms-of-service" className="underline">Terms and Conditions</a> and <a href="code-of-conduct" className="underline">Code of Conduct</a></label>
    </div>
                    <div className="text-right md:col-span-5">

                      <div className="inline-flex items-end">
                        <Button
                          className="translate-y-[-1rem] animate-fade-in opacity-0"
                          size="small"
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;