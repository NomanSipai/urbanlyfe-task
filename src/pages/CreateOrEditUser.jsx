import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-300 rounded-md h-10 w-full mt-2"></div>
);

const CreateOrEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(!!id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "male",
      birthDate: null,
    },
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`https://dummyjson.com/users/${id}`)
        .then((res) => {
          reset(res.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch user details");
          setLoading(false);
        });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        await axios.put(`https://dummyjson.com/users/${id}`, data);
        toast.success("User updated successfully");
      } else {
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User created successfully");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message ?? "Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
        ← Go Back
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? "Edit User" : "Create User"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <input
              {...register("firstName", { required: "First Name is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
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
          {loading ? (
            <SkeletonLoader />
          ) : (
            <input
              {...register("lastName", { required: "Last Name is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
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
          {loading ? (
            <SkeletonLoader />
          ) : (
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter Email"
            />
          )}
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <select
              {...register("gender")}
              className="w-full p-3 border border-gray-300 rounded-md">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholderText="Select Birth Date"
                  dateFormat="yyyy-MM-dd"
                  isClearable
                  showMonthYearPicker={false}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  scrollableMonthYearDropdown
                />
              )}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700"
          disabled={loading}>
          {loading ? (
            <img
              height={30}
              width={30}
              src="/loading.gif"
              alt="inputLoading-img"
            />
          ) : id ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateOrEditPage;
