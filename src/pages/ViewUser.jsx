import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-24 w-24 bg-gray-300 rounded-full mb-6"></div>

    <div className="space-y-4 mt-4">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        ))}
    </div>
  </div>
);

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      toast.error(error.message ?? "Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
        ← Go Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        User Details
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <SkeletonLoader />
        ) : (
          user && (
            <div>
              {/* User Image */}
              <img
                src={user.image}
                alt={user.firstName}
                className="w-24 h-24 rounded-full shadow-md"
              />

              {/* User Details */}
              <div className="mt-4 space-y-4">
                <p className="text-lg text-gray-700 font-medium">
                  <strong>First Name:</strong> {user.firstName}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Last Name:</strong> {user.lastName}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Gender:</strong> {user.gender}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Birth Date:</strong> {user.birthDate}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Username:</strong> {user.username}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Age:</strong> {user.age}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  <strong>Address:</strong> {user.address.address},{" "}
                  {user.address.city}, {user.address.state}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ViewUser;
