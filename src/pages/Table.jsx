// import { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import DeleteModal from "../components/DeleteModal";

// const Table = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
//   const [selectedGender, setSelectedGender] = useState("All");
//   const [startDate, setStartDate] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const pageSize = 10;
//   const [isDeleteModal, setIsDeleteModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [searchTerm]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       let url = `https://dummyjson.com/users?limit=${pageSize}&skip=${
//         (currentPage - 1) * pageSize
//       }`;

//       if (debouncedSearchTerm) {
//         url = `https://dummyjson.com/users/search?q=${debouncedSearchTerm}&limit=${pageSize}&skip=${
//           (currentPage - 1) * pageSize
//         }`;
//       } else if (selectedGender !== "All") {
//         url = `https://dummyjson.com/users/filter?key=gender&value=${selectedGender.toLowerCase()}&limit=${pageSize}&skip=${
//           (currentPage - 1) * pageSize
//         }`;
//       } else if (startDate) {
//         const date = new Date(startDate);
//         const formattedDate = `${date.getFullYear()}-${
//           date.getMonth() + 1
//         }-${date.getDate()}`;
//         url = `https://dummyjson.com/users/filter?key=birthDate&value=${formattedDate}&limit=${pageSize}&skip=${
//           (currentPage - 1) * pageSize
//         }`;
//       }

//       const response = await fetch(url);
//       const data = await response.json();
//       setUsers(data.users);
//       setTotalUsers(data.total || 0);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//     setLoading(false);
//   };

//   const handleDeleteUser = async () => {
//     try {
//       const res = await axios.delete(
//         `https://dummyjson.com/users/${isDeleteModal}`
//       );
//       if (res.status === 200) {
//         toast.success("user deleted successfully");
//         await fetchUsers();
//       } else {
//         toast.error("Error while deleting user");
//       }
//     } catch (error) {
//       toast.error(error.message ?? "Error while deleting user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [debouncedSearchTerm, selectedGender, startDate, currentPage]);

//   const totalPages = Math.ceil(totalUsers / pageSize);

//   return (
//     <section className="bg-gray-50 p-3 sm:p-5">
//       <DeleteModal
//         isOpen={isDeleteModal}
//         onConfirm={handleDeleteUser}
//         onClose={() => setIsDeleteModal(false)}
//       />
//       <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
//         <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
//           <div className="flex justify-between items-center mb-6">
//             <button
//               className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg shadow-md"
//               onClick={() => navigate("/users/create")}>
//               Add User
//             </button>
//             <input
//               type="text"
//               className="border p-3 w-full sm:max-w-md rounded-lg shadow-md"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <div className="flex gap-4">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 className="border p-3 rounded-lg shadow-md w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholderText="Select a date"
//                 dateFormat="yyyy-MM-dd"
//                 isClearable
//                 showMonthYearPicker={false}
//                 showYearDropdown
//                 showMonthDropdown
//                 dropdownMode="select"
//                 scrollableMonthYearDropdown
//               />
//               <select
//                 className="border p-3 rounded-lg shadow-md w-full sm:w-auto"
//                 value={selectedGender}
//                 onChange={(e) => {
//                   setSelectedGender(e.target.value);
//                   setCurrentPage(1);
//                 }}>
//                 <option value="All">All Genders</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3">ID</th>
//                   <th className="px-4 py-3">First Name</th>
//                   <th className="px-4 py-3">Last Name</th>
//                   <th className="px-4 py-3">Email</th>
//                   <th className="px-4 py-3">Gender</th>
//                   <th className="px-4 py-3">Birth Date</th>
//                   <th className="px-4 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading
//                   ? Array.from({ length: 10 }).map((_, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="px-4 py-3">
//                           <Skeleton width={50} height={20} />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Skeleton width={120} height={20} />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Skeleton width={120} height={20} />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Skeleton width={150} height={20} />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Skeleton width={80} height={20} />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Skeleton width={120} height={20} />
//                         </td>
//                         <td className="px-4 py-3 text-center flex justify-center gap-3">
//                           <Skeleton circle width={20} height={20} />
//                           <Skeleton circle width={20} height={20} />
//                           <Skeleton circle width={20} height={20} />
//                         </td>
//                       </tr>
//                     ))
//                   : users.map((user) => (
//                       <tr key={user.id} className="border-b">
//                         <td className="px-4 py-3">{user.id}</td>
//                         <td className="px-4 py-3">{user.firstName}</td>
//                         <td className="px-4 py-3">{user.lastName}</td>
//                         <td className="px-4 py-3">{user.email}</td>
//                         <td className="px-4 py-3">{user.gender}</td>
//                         <td className="px-4 py-3">{user.birthDate}</td>
//                         <td className="px-4 py-3 flex justify-center gap-3">
//                           <FaEye
//                             className="text-blue-500 cursor-pointer"
//                             onClick={() => navigate(`/users/view/${user.id}`)}
//                           />
//                           <FaEdit
//                             className="text-yellow-500 cursor-pointer"
//                             onClick={() => navigate(`/users/edit/${user.id}`)}
//                           />
//                           <FaTrash
//                             className="text-red-500 cursor-pointer"
//                             onClick={() => setIsDeleteModal(user.id)}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-between items-center mt-4 p-4">
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}>
//               Previous
//             </button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Table;

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 10;
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/users?limit=${pageSize}&skip=${
        (currentPage - 1) * pageSize
      }`;

      if (debouncedSearchTerm) {
        url = `https://dummyjson.com/users/search?q=${debouncedSearchTerm}&limit=${pageSize}&skip=${
          (currentPage - 1) * pageSize
        }`;
      } else if (selectedGender !== "All") {
        url = `https://dummyjson.com/users/filter?key=gender&value=${selectedGender.toLowerCase()}&limit=${pageSize}&skip=${
          (currentPage - 1) * pageSize
        }`;
      } else if (startDate) {
        const date = new Date(startDate);
        const formattedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        url = `https://dummyjson.com/users/filter?key=birthDate&value=${formattedDate}&limit=${pageSize}&skip=${
          (currentPage - 1) * pageSize
        }`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.users);
      setTotalUsers(data.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async () => {
    setDeleteLoading(true);
    try {
      const res = await axios.delete(
        `https://dummyjson.com/users/${deleteIndex}`
      );
      if (res.status === 200) {
        toast.success("user deleted successfully");
        await fetchUsers();
      } else {
        toast.error("Error while deleting user");
      }
    } catch (error) {
      toast.error(error.message ?? "Error while deleting user");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModal(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm, selectedGender, startDate, currentPage]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <section className="bg-gray-50 container mx-auto p-3 sm:p-5">
      <DeleteModal
        isOpen={isDeleteModal}
        onConfirm={handleDeleteUser}
        onClose={() => setIsDeleteModal(false)}
        loading={deleteLoading}
      />

      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white shadow-md sm:rounded-lg overflow-hidden px-2 py-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <button
              className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg shadow-md w-full sm:w-auto"
              onClick={() => navigate("/users/create")}>
              Add User
            </button>

            <input
              type="text"
              className="border p-3 w-full sm:max-w-xs rounded-lg shadow-md"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="flex flex-wrap items-center gap-3">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border p-3 rounded-lg shadow-md w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholderText="Select a birthdate"
                dateFormat="yyyy-MM-dd"
                isClearable
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />

              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                {["All", "Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      selectedGender === gender
                        ? "bg-blue-500 text-white shadow"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedGender(gender);
                      setCurrentPage(1);
                    }}>
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Birth Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">
                        <Skeleton width={50} height={20} />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton width={120} height={20} />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton width={120} height={20} />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton width={150} height={20} />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton width={80} height={20} />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton width={120} height={20} />
                      </td>
                      <td className="px-4 py-3 text-center flex justify-center gap-3">
                        <Skeleton circle width={20} height={20} />
                        <Skeleton circle width={20} height={20} />
                        <Skeleton circle width={20} height={20} />
                      </td>
                    </tr>
                  ))
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3">{user.id}</td>
                      <td className="px-4 py-3">{user.firstName}</td>
                      <td className="px-4 py-3">{user.lastName}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.gender}</td>
                      <td className="px-4 py-3">{user.birthDate}</td>
                      <td className="px-4 py-3 flex justify-center gap-3">
                        <FaEye
                          className="text-blue-500 cursor-pointer"
                          onClick={() => navigate(`/users/view/${user.id}`)}
                        />
                        <FaEdit
                          className="text-yellow-500 cursor-pointer"
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setIsDeleteModal(true);
                            setDeleteIndex(user.id);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-gray-500">
                      No record found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 p-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}>
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
