import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";

function ContactPage() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [isSending, setIsSending] = useState(true);

  const handleSubmit = async () => {
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !messageRef.current.value
    ) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      setIsSending(true);
      await axios.post("http://localhost:3000/api/contact", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
      });
      toast.success("Message sent successfully!");
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Contact Us
          </h2>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              ref={messageRef}
              rows="4"
              placeholder="Your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={isSending}
          >
            {isSending ? (
              <button
                disabled
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                <span className="inline-block animate-bounce">Sending...</span>
              </button>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
