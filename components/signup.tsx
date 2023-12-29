import React, { useEffect, useState } from "react";
import styles from "./SignupForm.module.css";
import { Button } from "./button";
import Tos from "./terms-of-service";
import CodeOfConduct from "./sections/code-of-conduct";
import { redirect } from "next/navigation";
const SignupForm = () => {
  const [FromStep, setFromStep] = useState({
    details: true,
    tos: false,
    coc: false,
  });
  const [formState, setFormState] = useState({
    name: "",
    contactNumber: "",
    linkedInProfile: "",
    email: "",
    experiences: [{ position: "", company: "", startDate: "", endDate: "" }],
    agreedToTos: false,

    agreedToCoc: false,
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
      experiences: prevState.experiences.filter(
        (_, expIndex) => expIndex !== index
      ),
    }));
  };
  const handleCheckboxChange = () => {
    setFormState((prevState) => ({
      ...prevState,
      agreedToTerms: !prevState.agreedToTerms,
    }));
  };
  const handleTosChange = () => {
    setFormState((prevState) => ({
      ...prevState,
      agreedToTos: !prevState.agreedToTos,
    }));
  };

  const handleCocChange = () => {
    setFormState((prevState) => ({
      ...prevState,
      agreedToCoc: !prevState.agreedToCoc,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.agreedToTos && !formState.agreedToCoc) {
      alert("You must agree to the terms of service before submitting.");
      return;
    }
    try {
      const response = await fetch("https://api.point103.com/add_profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      alert("Success! We'll reach out to you shortly");
      redirect("/");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const [IsMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto max-w-screen-lg">
          <div>
            <div className="shadow-lg mb-6 rounded p-4 px-4 md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
                {IsMobile ? (
                  <div className="text-gray-600 flex flex-row items-center justify-center">
                    <div
                      className={`h-8 w-8 rounded-full ${
                        FromStep.details || FromStep.tos || FromStep.coc
                          ? `bg-white`
                          : `bg-grey-dark`
                      } flex items-center justify-center`}
                    >
                      <p
                        className={`flex items-center justify-center text-xs font-medium ${
                          FromStep.details || FromStep.tos || FromStep.coc
                            ? `text-grey-dark`
                            : ``
                        }`}
                      >
                        1
                      </p>
                    </div>
                    <div>
                      <div
                        className={`h-1 w-12 ${
                          FromStep.tos || FromStep.coc
                            ? `bg-white`
                            : `bg-grey-dark`
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full ${
                        FromStep.tos || FromStep.coc
                          ? `bg-white`
                          : `bg-grey-dark`
                      } flex items-center justify-center`}
                    >
                      <p
                        className={`flex items-center justify-center text-xs font-medium ${
                          FromStep.tos || FromStep.coc ? `text-grey-dark` : ``
                        }`}
                      >
                        2
                      </p>
                    </div>
                    <div
                      className={`h-1 w-12 ${
                        FromStep.coc ? `bg-white` : `bg-grey-dark`
                      }`}
                    ></div>

                    <div
                      className={`h-8 w-8 rounded-full ${
                        FromStep.coc ? `bg-white` : `bg-grey-dark`
                      } flex items-center justify-center`}
                    >
                      <p
                        className={`flex items-center justify-center text-xs font-medium ${
                          FromStep.coc ? `text-grey-dark` : ``
                        }`}
                      >
                        3
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600 flex flex-col space-y-8">
                    <div
                      className={`p-4 ${
                        FromStep.details
                          ? `border-l-4 bg-transparent-white`
                          : ``
                      }`}
                    >
                      <p className="text-lg font-medium">1. Personal Details</p>
                    </div>
                    <div
                      className={`p-4 ${
                        FromStep.tos ? `border-l-4 bg-transparent-white` : ``
                      }`}
                    >
                      <p className="text-lg font-medium">
                        2. Terms And Conditions
                      </p>
                    </div>

                    <div
                      className={`p-4 ${
                        FromStep.coc ? `border-l-4 bg-transparent-white` : ``
                      }`}
                    >
                      <p className="text-lg font-medium">3. Code Of Conduct</p>
                    </div>
                  </div>
                )}

                {FromStep.details && (
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
                        <label>Personal Email</label>
                        <input
                          className="bg-gray-50 mt-1 h-10 w-full rounded border px-4 text-grey"
                          name="email"
                          onChange={handleChange}
                          placeholder="Personal Email"
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
                                onClick={() => removeExperience(index)}
                              >
                                Remove Job
                              </Button>
                            )}
                          </div>
                        </React.Fragment>
                      ))}

                      <div className="text-right md:col-span-5">
                        <div className="inline-flex items-end">
                          <Button
                            className="translate-y-[-1rem] animate-fade-in opacity-0"
                            size="small"
                            variant="primary"
                            onClick={() => {
                              setFromStep((prevState) => ({
                                ...prevState,
                                details: false,
                                tos: true,
                              }));
                            }}
                          >
                            Next Step
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {FromStep.tos && (
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
                      <div className="max-h-1/3 overflow-y-auto md:col-span-5">
                        <p className="">
                          <Tos></Tos>
                        </p>
                      </div>
                      <div className=" justify-self-end md:col-span-5">
                        <div className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formState.agreedToTos}
                            onChange={handleTosChange}
                          />
                          <label htmlFor="terms">
                            {" "}
                            I have read and agree to the Terms Of Service
                          </label>
                        </div>
                      </div>

                      <div className="text-right md:col-span-5 ">
                        <div className="inline-flex items-end space-x-4">
                          <Button
                            onClick={() => {
                              setFromStep((prevState) => ({
                                ...prevState,
                                details: true,
                                tos: false,
                              }));
                            }}
                          >
                            back
                          </Button>

                          <Button
                            disabled={!formState.agreedToTos}
                            variant={
                              !formState.agreedToTos ? `secondary` : `primary`
                            }
                            onClick={() => {
                              setFromStep((prevState) => ({
                                ...prevState,
                                coc: true,
                                tos: false,
                              }));
                            }}
                          >
                            Next step
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {FromStep.coc && (
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
                      <div className="max-h-1/3 overflow-y-auto md:col-span-5">
                        <p>
                          <CodeOfConduct></CodeOfConduct>
                        </p>
                      </div>
                      <div className=" justify-self-end md:col-span-5">
                        <div className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="coc"
                            checked={formState.agreedToCoc}
                            onChange={handleCocChange}
                          />
                          <label htmlFor="coc">
                            {" "}
                            I have read and agree to the Code Of Conduct
                          </label>
                        </div>
                      </div>

                      <div className="text-right md:col-span-5">
                        <div className="inline-flex items-end space-x-4">
                          <Button
                            onClick={() => {
                              setFromStep((prevState) => ({
                                ...prevState,
                                coc: false,
                                tos: true,
                              }));
                            }}
                          >
                            back
                          </Button>

                          <Button
                            disabled={!formState.agreedToCoc}
                            variant={
                              !formState.agreedToCoc ? `secondary` : `primary`
                            }
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
