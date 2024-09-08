import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const VerifyPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:7070/api/user/verifyemail/${token}`);
        setMessage("Email verified successfully! You can now log in.");
      } catch (error) {
        setMessage("Verification failed. Please try again.");
        console.log(error);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center ">
        <h1 className="text-2xl font-semibold text-gray-800">
          Verification Status
        </h1>
        <p className="text-gray-600 mt-2">{message}</p>
        <a href="/" className="text-blue-500 hover:underline">
          Go to Homepage then login
        </a>
      </div>
    </div>
  );
};

export default VerifyPage;
