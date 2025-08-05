import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBoxOpen,
  FaCreditCard,
  FaHistory,
  FaTruck,
  FaEdit,
  FaLock,
  FaBell,
  FaTags,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserFriends,
  FaQuestionCircle,
  FaFileDownload,
  FaLaptop,
  FaLocationArrow,
  FaSearchLocation,
} from "react-icons/fa";
import Navbar from "../Navbar";
import { MdOutlineLocationOn } from "react-icons/md";

import toast from "react-hot-toast";
import axios from "axios";
import useUserLocation from "../CustomerLocation/useUserLocation";
import { useRef } from "react";

import UserEmail from "../Getemail";
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const UserName = useRef();
  const Email = useRef();
  const UserPhonenumber = useRef();
  const UserGender = useRef();
  const country = useRef();
  const state = useRef();
  const city = useRef();
  const postcode = useRef();
  const loginUserEmail = UserEmail;
  const { locationData, getLocation } = useUserLocation(); // auto-fetch enabled by default
  const Send = () => {
    const data = {
      Name: UserName.current.value,
      Email: Email.current.value,
      PhoneNumber: UserPhonenumber.current.value,
      Gender: UserGender.current.value,
      country: country.current.value,
      state: state.current.value,
      city: city.current.value,
      postcode: postcode.current.value,
      LoginEmail: loginUserEmail,
    };
    console.table(data);
  };
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 min-h-[100vh] pb-16 font-mono">
        <div className="max-w-5xl mx-auto px-4 pt-10 space-y-10">
          {isEditing ? (
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Your Profile
              </h2>

              <form className="space-y-4">
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Personal Info */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      ref={UserName}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      ref={Email}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      ref={UserPhonenumber}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="text-blue-600"
                          ref={UserGender}
                        />
                        <span className="text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          ref={UserGender}
                          className="text-blue-600"
                        />
                        <span className="text-gray-700">Female</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          ref={UserGender}
                          className="text-blue-600"
                        />
                        <span className="text-gray-700">Other</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-white bg-blue-500 px-3 py-1.5 rounded"
                  onClick={getLocation}
                >
                  <MdOutlineLocationOn />
                  Get Location
                </button>
                {/* Location Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Location
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={locationData.country}
                      ref={country}
                      // readOnly
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={locationData.state}
                      ref={state}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={locationData.city}
                      ref={city}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={locationData.postcode}
                      ref={postcode}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={Send}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <img
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-4 border-blue-200 shadow"
                />
                <div className="flex-1 flex flex-col gap-2 items-center sm:items-start">
                  <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                  </h1>
                  <div className="flex gap-4 flex-wrap text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <FaEnvelope className="text-blue-400" />
                    </span>
                    <span className="flex items-center gap-1">
                      <FaPhoneAlt className="text-green-500" />
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-pink-500" />{" "}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <FaClock /> Joined on
                  </span>
                </div>
                <ActionButton
                  label="Edit Profile"
                  icon={<FaEdit />}
                  onClick={() => setIsEditing(true)}
                />
              </div>

              {/* Action Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                <Section title="Orders & Payments" icon={<FaBoxOpen />}>
                  <ActionButton label="View Orders" icon={<FaBoxOpen />} />
                  <ActionButton
                    label="Payment Methods"
                    icon={<FaCreditCard />}
                  />
                  <ActionButton label="Order History" icon={<FaHistory />} />
                  <ActionButton label="Track Orders" icon={<FaTruck />} />
                  <ActionButton
                    label="Download Invoices"
                    icon={<FaFileDownload />}
                  />
                </Section>

                <Section title="Account Settings" icon={<FaEdit />}>
                  <ActionButton
                    label="Edit Profile"
                    icon={<FaEdit />}
                    onClick={() => setIsEditing(true)}
                  />
                  <ActionButton label="Change Password" icon={<FaLock />} />
                  <ActionButton
                    label="Notification Preferences"
                    icon={<FaBell />}
                  />
                  <ActionButton label="Saved Coupons" icon={<FaTags />} />
                </Section>

                <Section title="Quick Access" icon={<FaHeart />}>
                  <ActionButton label="Wishlist" icon={<FaHeart />} />
                  <ActionButton label="Cart" icon={<FaShoppingCart />} />
                  <ActionButton
                    label="Logout"
                    icon={<FaSignOutAlt />}
                    textColor="text-red-500"
                  />
                </Section>

                <Section title="My Rewards" icon={<FaTags />}>
                  <div className="text-lg font-semibold text-green-600">
                    🎉 250 Points
                  </div>
                  <p className="text-sm text-gray-500">
                    Earn more by shopping and reviewing
                  </p>
                </Section>

                <Section title="Referral Program" icon={<FaUserFriends />}>
                  <p className="text-sm text-gray-600">
                    Share your referral link & earn ₹100 per friend’s purchase!
                  </p>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                    Copy Referral Link
                  </button>
                </Section>

                <Section title="Security & Devices" icon={<FaLock />}>
                  <ActionButton label="Manage Devices" icon={<FaLaptop />} />
                  <ActionButton label="Enable 2FA" icon={<FaLock />} />
                </Section>

                <Section title="Support & Help" icon={<FaQuestionCircle />}>
                  <ActionButton label="Contact Support" icon={<FaEnvelope />} />
                  <ActionButton label="FAQs" icon={<FaQuestionCircle />} />
                </Section>

                <Section title="Recently Viewed" icon={<FaHistory />}>
                  <div className="flex space-x-3 overflow-x-auto">
                    <img
                      src="/products/shoe1.jpg"
                      alt="Recent"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <img
                      src="/products/shirt2.jpg"
                      alt="Recent"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <img
                      src="/products/watch3.jpg"
                      alt="Recent"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  </div>
                </Section>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Reusable components
const Section = ({ title, icon, children }) => (
  <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md min-h-[230px] flex flex-col">
    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2 border-b border-blue-100 pb-2">
      <span className="text-blue-400">{icon}</span> {title}
    </h2>
    <div className="grid gap-3">{children}</div>
  </div>
);

const ActionButton = ({
  label,
  icon,
  textColor = "text-blue-600",
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 font-semibold rounded-md hover:bg-blue-50 px-3 py-2 transition duration-150 outline-none focus:ring-2 focus:ring-blue-300 ${textColor}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-base">{label}</span>
  </button>
);

export default UserProfile;
