import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Table = ({
  userList,
  currentPage,
  totalUsers,
  pageSize,
  setCurrentPage,
  onEdit,
  onView,
  onDelete,
  loading,
}) => {
  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
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
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-3">
                          <Skeleton circle width={20} height={20} />
                          <Skeleton circle width={20} height={20} />
                          <Skeleton circle width={20} height={20} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : userList.length > 0 ? (
                  userList.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3">{user.id}</td>
                      <td className="px-4 py-3">{user.firstName}</td>
                      <td className="px-4 py-3">{user.lastName}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.gender}</td>
                      <td className="px-4 py-3">{user.birthDate}</td>
                      <td className="px-4 py-3 flex justify-center gap-3">
                        <button
                          onClick={() => onView(user?.id)}
                          className="text-blue-500 hover:text-blue-700">
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => onEdit(user?.id)}
                          className="text-yellow-500 hover:text-yellow-700">
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(user?.id)}
                          className="text-red-500 hover:text-red-700">
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap justify-between items-center p-4 gap-2 sm:gap-4 text-sm sm:text-base">
            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              Previous
            </button>

            <span className="w-full text-center sm:w-auto">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
