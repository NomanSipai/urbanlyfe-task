import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateOrEdit from "./components/CreateOrEdit";
import ViewUser from "./components/ViewUser";
import DeleteModal from "./components/DeleteModal";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewUserId, setViewUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearchTerm, startDate, selectedGender]);

  const fetchUsers = async () => {
    try {
      setSkeletonLoading(true);
      let url = `https://dummyjson.com/users`;
      const skip = (currentPage - 1) * pageSize;
      const params = { limit: pageSize, skip };

      if (debouncedSearchTerm) {
        url = `https://dummyjson.com/users/search?q=${debouncedSearchTerm}`;
      }

      if (startDate) {
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        const day = startDate.getDate();

        const formattedDate = `${year}-${month}-${day}`;

        url = `https://dummyjson.com/users/filter?key=birthDate&value=${formattedDate}`;
      }

      if (selectedGender !== "All") {
        url = `https://dummyjson.com/users/filter?key=gender&value=${selectedGender.toLowerCase()}`;
      }

      const res = await axios.get(url, { params });

      if (res.status === 200) {
        setUserList(res?.data?.users || []);
        setTotalUsers(res?.data?.total || 0);
      } else {
        toast.error("Error fetching users");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching users");
    } finally {
      setSkeletonLoading(false);
    }
  };

  const handleEdit = async (userId) => {
    setIsDrawerOpen(true);
    setInputLoading(true);
    try {
      const res = await axios.get(`https://dummyjson.com/users/${userId}`);
      if (res.status === 200) {
        setEditUser(res.data);
      } else {
        toast.error("Failed to fetch user details");
      }
    } catch (error) {
      toast.error(error.message ?? "Error fetching user details");
    } finally {
      setInputLoading(false);
    }
  };

  const handleViewUser = (userId) => {
    setViewUserId(userId);
    setIsViewOpen(true);
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUserList(userList.filter((user) => user.id !== userToDelete));
      toast.success("User deleted");
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (data) => {
    try {
      if (editUser) {
        const res = await axios.put(
          `https://dummyjson.com/users/${editUser.id}`,
          data
        );
        if (res.status === 200) {
          const updatedUser = res.data;
          setUserList((prevList) =>
            prevList.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          toast.success("User updated successfully");
        }
      } else {
        const res = await axios.post("https://dummyjson.com/users/add", data);
        if (res.status === 200) {
          const newUser = res.data;
          setUserList((prevList) => [newUser, ...prevList]);
          toast.success("User created successfully");
        }
      }
      setIsDrawerOpen(false);
      setEditUser(null);
    } catch (error) {
      toast.error(error.message ?? "Failed to save user");
    }
  };

  const handleAddUserOpen = () => {
    setIsAddUserOpen(true);
  };

  const handleAddUserClose = () => {
    setIsAddUserOpen(false);
  };

  const handleAddUserSave = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", data);
      if (res.status === 200) {
        const newUser = res.data;
        setUserList((prevList) => [newUser, ...prevList]);
        toast.success("User created successfully");
      }
      setIsAddUserOpen(false);
    } catch (error) {
      toast.error(error.message ?? "Failed to add user");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={handleAddUserOpen}
              className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
              Add User
            </button>
          </div>

          <div className="w-full sm:max-w-md">
            <input
              type="text"
              className="border p-3 w-full rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex gap-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border p-3 rounded-lg shadow-md w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
              isClearable
              showMonthYearPicker={false}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              scrollableMonthYearDropdown
            />

            <select
              className="border p-3 rounded-lg shadow-md w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                setCurrentPage(1);
              }}>
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <Table
          userList={userList}
          currentPage={currentPage}
          totalUsers={totalUsers}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleViewUser}
          loading={skeletonLoading}
        />

        {isDrawerOpen && (
          <CreateOrEdit
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onSave={handleSave}
            user={editUser}
            inputLoading={inputLoading}
          />
        )}

        {isViewOpen && (
          <ViewUser
            isOpen={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            userId={viewUserId}
          />
        )}

        <DeleteModal
          isOpen={isModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />

        {isAddUserOpen && (
          <CreateOrEdit
            isOpen={isAddUserOpen}
            onClose={handleAddUserClose}
            onSave={handleAddUserSave}
          />
        )}
      </div>
    </div>
  );
};

export default App;
