import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ViewUser = ({ isOpen, onClose, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/users/${userId}`);
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      toast.error(error.message ?? "Failed to fetch user details");
    }
  };

  if (!user) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl rounded-l-3xl p-8 overflow-auto transform transition-all ease-in-out duration-300">
          <Dialog.Title className="text-3xl font-semibold text-gray-800 mb-6">
            User Details
          </Dialog.Title>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700 font-medium">
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700 font-medium">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700 font-medium">
                <strong>Gender:</strong> {user.gender}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700 font-medium">
                <strong>Birth Date:</strong> {user.birthDate}
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewUser;
