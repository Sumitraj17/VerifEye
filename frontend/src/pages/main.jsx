import { FaFileUpload, FaGoogleDrive } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import { Context } from "../context/context.jsx"; // Import from the context

const Home = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [loader, setLoader] = useState(false);
  const { user, update, updateLogin } = useContext(Context); // Access update functions
  const navigate = useNavigate(); // Navigation

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append("prompt", input);
    setLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/fact",
        {
          text: input,
          id: user, // Send user id with the request
        }
      );
      setOutput(response.data);
      setInput("");
      setLoader(false);
    } catch (err) {
      console.error("Error submitting the form", err);
      setLoader(false); // Ensure loader is turned off on error
    }
  };
  const handleLogout = () => {
    update(false); // Update the login state to false
    updateLogin(false); // Update the login process state to false
    localStorage.removeItem("id"); // Remove user ID from local storage
    localStorage.removeItem("loggedIn"); // Clear logged-in status
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className="text-white flex justify-evenly items-center h-screen">
      <div className="h-3/4 w-2/5 bg-gray-300 text-center text-black flex items-center justify-center">
        <form
          className="w-full h-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <textarea
            name="input"
            className="w-full h-full p-2 text-gray-600 text-xl"
            placeholder="Enter Fact..."
            onChange={handleChange}
            value={input}
          ></textarea>
          <div className="flex justify-between bg-white w-full p-3">
            <div className="flex flex-col w-full">
              <button
                type="button"
                className="font-bold p-2 flex items-center"
                disabled
              >
                <FaGoogleDrive className="mr-2" />
                <span>Upload from Drive</span>
              </button>
              <button
                type="button"
                className="font-bold p-2 flex items-center"
                onClick={handleFileUploadClick}
              >
                <FaFileUpload className="mr-2" />
                <span>Upload from Computer</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className={`p-1 pl-4 pr-4 text-xl font-bold rounded-2xl shadow-lg hover:bg-gray-700 ${
                  loader ? "bg-gray-600" : "bg-black text-white"
                }`}
              >
                Appraise
              </button>
              <button
                type="button"
                className={`p-1 pl-4 pr-4 text-xl font-bold rounded-2xl shadow-lg hover:bg-gray-700 ${
                  loader ? "bg-gray-600" : "bg-black text-white"
                }`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="h-3/4 w-2/5 bg-gray-300 text-center text-black flex items-center justify-center">
        <div
          className={
            output
              ? "w-full h-full p-2 text-black bg-white text-xl overflow-auto"
              : "w-full h-full p-2 text-gray-600 text-xl overflow-auto"
          }
        >
          {output ? (
            <>
              <p>
                <strong>Prediction:</strong> {output.prediction}
              </p>
              <p>
                <strong>Confidence:</strong> {output.confidence}
              </p>
              <p>
                <strong>Explanation:</strong> {output.explanation}
              </p>
              <p>
                <strong>Source:</strong> {output.source}
              </p>
            </>
          ) : loader ? (
            <div className="flex items-center justify-center h-full">
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          ) : (
            <p>No output to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
