import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-300 rounded-md h-10 w-full mt-2"></div>
);

const CreateOrEdit = ({ isOpen, onClose, onSave, user, inputLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "Male",
      birthDate: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        gender: "Male",
        birthDate: null,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (user) {
        response = await axios.put(
          `https://dummyjson.com/users/${user.id}`,
          data
        );
        toast.success("User updated successfully");
      } else {
        response = await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User created successfully");
      }
      onSave(response.data);
      onClose();
    } catch (error) {
      toast.error(error.message ?? "Failed to save user");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl p-8 rounded-l-3xl overflow-auto transition-transform transform ease-in-out duration-300">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-800">
              {user ? "Edit User" : "Create User"}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              {inputLoading ? (
                <SkeletonLoader />
              ) : (
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-[#4a694f] focus:border-[#4a694f]"
                  placeholder="Enter First Name"
                />
              )}
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              {inputLoading ? (
                <SkeletonLoader />
              ) : (
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-[#4a694f] focus:border-[#4a694f]"
                  placeholder="Enter Last Name"
                />
              )}
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {inputLoading ? (
                <SkeletonLoader />
              ) : (
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-[#4a694f] focus:border-[#4a694f]"
                  placeholder="Enter Email"
                />
              )}
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              {inputLoading ? (
                <SkeletonLoader />
              ) : (
                <select
                  {...register("gender")}
                  value={setValue("gender")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-[#4a694f] focus:border-[#4a694f]">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birth Date
              </label>
              {inputLoading ? (
                <SkeletonLoader />
              ) : (
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="w-full p-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-[#4a694f] focus:border-[#4a694f]"
                      placeholderText="Select Birth Date"
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                />
              )}
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto text-white bg-[#4a694f] hover:bg-[#5f8765] border border-transparent rounded-md px-5 py-2.5 text-lg font-semibold focus:ring-2 focus:ring-[#4a694f] focus:outline-none disabled:opacity-50"
                disabled={inputLoading}>
                {inputLoading ? (
                  <img
                    height={30}
                    width={30}
                    src="/loading.gif"
                    alt="inputLoading-img"
                  />
                ) : user ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateOrEdit;
