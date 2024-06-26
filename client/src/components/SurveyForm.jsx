// SurveyForm.js
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import CompanyTitle from "./CompanyTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../helper/formHelper";

const SurveyForm = () => {
  const questions = [
    {
      question:
        "3. How did you get response from our CS representative timely manner ?",
      options: ["Always", "Often", "Sometimes", "Never"],
    },
    {
      question: "4. Did you get goods delivery within expected timeline ?",
      options: ["Always", "Often", "Sometimes", "Never"],
    },
    {
      question:
        "5. How would you rate your experience with our Customer Service Team ?",
      options: [
        "Satisfied",
        "Not Much Satisfied",
        "Very Much Satisfied",
        "Not Satisfied At all",
      ],
    },
    {
      question: "6. How do you rate overall service from Enam Trims Ltd ?",
      options: ["Very Good", "Good", "Satisfactory", "Poor"],
    },
  ];

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [comments, setComments] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start at -1 to indicate user name input
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleNameSubmit = () => {
    // Check if the name field is not empty
    if (name.trim() !== "") {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next step: input company name
    } else {
      return ErrorToast("Please provide your name");
    }
  };

  const handleCompanySubmit = () => {
    if (companyName.trim() !== "") {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the first survey question
    } else {
      return ErrorToast("Please provide your factory name");
    }
  };

  const handleOptionSelect = (option) => {
    const question = questions[currentQuestionIndex - 1]; // Get the current question
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question.question]: option, // Update answers using the current question
    }));
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      // Last question, move to comments
      setCurrentQuestionIndex(-2); // Special indicator for comments
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1); // Move to the previous question
  };

  const handleSubmit = async () => {
    if (
      name &&
      companyName &&
      Object.keys(answers).length === questions.length
    ) {
      const postBody = {
        full_name: name,
        factory_name: companyName,
        timely_manner: answers[questions[0].question],
        expected_timeline: answers[questions[1].question],
        customer_service: answers[questions[2].question],
        rate_overall: answers[questions[3].question],
        suggestion: comments,
      };
      await axios
        .post("https://client-survey.onrender.com/servey", postBody)
        .then((res) => {
          if (res.status == "201") {
            SuccessToast(res.data.message);
            navigate("/success");
          }
        });
    } else {
      // Show error message or handle the case where all fields are not filled
      ErrorToast("Something went wrong. Try again");
    }
  };

  return (
    <div>
      <div className=" bg-[#a7c6ac] flex justify-center items-center p-1 md:p-5">
        <CompanyTitle />
      </div>

      {/* survey content  start*/}
      <div className="flex justify-center pt-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {currentQuestionIndex === -1 && (
            <div className="md:w-[600px]">
              <div className="text-lg md:text-xl">
                <p>1. Please provide your Full name</p>
              </div>
              <br />
              <input
                type="text"
                ref={inputRef}
                value={name}
                className="border w-full p-2 mt-2 rounded-lg focus:outline-green-200 text-lg"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />

              <div className="pt-10 md:pt-20">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white block w-full p-2 rounded-lg  text-xl"
                  onClick={handleNameSubmit}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {currentQuestionIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="px-2 md:w-[600px]"
            >
              <div className="text-lg md:text-xl">
                <p>2. Please provide your Factory name</p>
              </div>
              <br />
              <input
                placeholder="Your Factory Name"
                type="text"
                ref={inputRef}
                className="border w-full p-2 mt-2 rounded-lg focus:outline-green-200 text-lg"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <div className="flex space-x-5 pt-10">
                <button
                  className="border border-green-700 p-2 hover:bg-green-700 transition duration-300 hover:text-white rounded "
                  onClick={handlePrevious}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 transition duration-100 text-white p-2 rounded px-10 md:px-36 w-full"
                  onClick={handleCompanySubmit}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {currentQuestionIndex >= 1 &&
            currentQuestionIndex <= questions.length && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="p-5 md:py-10 py-5 w-full md:w-[600px] md:h-[500px]"
              >
                <motion.h2
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-lg md:text-xl"
                >
                  {questions[currentQuestionIndex - 1].question}
                </motion.h2>
                <ul>
                  {questions[currentQuestionIndex - 1].options.map(
                    (option, index) => (
                      <li
                        className="border border-green-200 my-3 hover:bg-green-200 transition duration-200 cursor-pointer rounded"
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <div className="flex gap-3 items-center">
                          <span className="bg-green-400 p-2 md:p-3 text-slate-100">
                            ✔
                          </span>
                          {option}
                        </div>
                      </li>
                    )
                  )}
                </ul>
                {currentQuestionIndex > 0 && (
                  <button
                    className=" mt-3 border border-green-700 p-1 hover:bg-green-700 hover:text-white rounded"
                    onClick={handlePrevious}
                  >
                    <IoIosArrowBack
                      size={25}
                      className="text-green hover:text-white"
                    />
                  </button>
                )}
              </motion.div>
            )}

          {currentQuestionIndex === -2 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4 md:px-0 md:w-[600px]"
            >
              <div className="text-lg md:text-xl">
                <p>
                  7. Any suggestion or advice how we could improve our service
                  in future?
                </p>
              </div>
              <div className="relative">
                <textarea
                  value={comments}
                  ref={inputRef}
                  onChange={(e) => setComments(e.target.value)}
                  className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border  px-3 py-2.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-200"
                ></textarea>
              </div>
              <div className="py-5">
                <button
                  className="bg-green-700 hover:bg-green-800 transition duration-100 text-white p-2 rounded block w-full md:px-32"
                  onClick={handleSubmit}
                >
                  Finish
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      {/* survey content end  */}
    </div>
  );
};

export default SurveyForm;
