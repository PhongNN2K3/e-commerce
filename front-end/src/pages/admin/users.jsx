import { Button } from "@/components/ui/button";
import { getAllUsers, updateUserRole } from "@/store/admin/user-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function AdminUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUser);
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, role: newRole })).then((data) => {
      if (data.payload.success) {
        setSelectedRole({});
        dispatch(getAllUsers());
        toast.success("Cập nhật vai trò thành công");
      } else {
        toast.error("Cập nhật vai trò thất bại");
      }
    });
  };

  return (
    <div className="w-full max-h-[calc(100vh-32px)] overflow-y-auto">
      <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border-black p-2 text-left">Tên người dùng</th>
            <th className="border-black p-2 text-left">Email</th>
            <th className="border-black p-2 text-left">Vai trò</th>
            <th className="border-black p-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="border-black p-2 text-left">{user.username}</td>
              <td className="border-black p-2 text-left">{user.email}</td>
              <td className="border-black p-2 text-left">
                <select
                  value={selectedRole[user._id] || user.role}
                  onChange={(e) =>
                    setSelectedRole({
                      ...selectedRole,
                      [user._id]: e.target.value,
                    })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border-black p-2 text-left">
                <Button
                  onClick={() =>
                    handleRoleChange(
                      user._id,
                      selectedRole[user._id] || user.role
                    )
                  }
                  disabled={selectedRole[user._id] === user.role} // Disable if the role hasn't changed
                >
                  Cập nhật
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
