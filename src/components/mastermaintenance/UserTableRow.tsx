// src/components/MasterMaintenance/UserTableRow.tsx
import { UserData } from "./index";

interface UserTableRowProps {
  user: UserData;
  editData: UserData;
  onChangeField: (
    id: number,
    field: keyof UserData,
    value: string | number | boolean
  ) => void;
  onToggleDelete: (id: number) => void;
}

const UserTableRow = ({
  user,
  editData,
  onChangeField,
  onToggleDelete,
}: UserTableRowProps) => {
  const isDeleted = editData?.isDeleted || false;

  return (
    <tr
      className={`hover:bg-gray-50 ${isDeleted ? "bg-gray-100" : "bg-white"}`}
    >
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          isDeleted ? "text-gray-500" : "text-black"
        }`}
      >
        {user.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <input
          type="text"
          className={`w-full px-2 py-1 border rounded-md ${
            isDeleted ? "bg-gray-100 text-gray-500" : "bg-white text-black"
          }`}
          value={editData?.name || ""}
          onChange={(e) => onChangeField(user.id, "name", e.target.value)}
          disabled={isDeleted}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <input
          type="number"
          className={`w-full px-2 py-1 border rounded-md ${
            isDeleted ? "bg-gray-100 text-gray-500" : "bg-white text-black"
          }`}
          value={editData?.age || ""}
          onChange={(e) =>
            onChangeField(user.id, "age", parseInt(e.target.value) || 0)
          }
          disabled={isDeleted}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <select
          className={`w-full px-2 py-1 border rounded-md ${
            isDeleted ? "bg-gray-100 text-gray-500" : "bg-white text-black"
          }`}
          value={editData?.gender || ""}
          onChange={(e) => onChangeField(user.id, "gender", e.target.value)}
          disabled={isDeleted}
        >
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
          <option value="未設定">未設定</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <input
          type="text"
          className={`w-full px-2 py-1 border rounded-md ${
            isDeleted ? "bg-gray-100 text-gray-500" : "bg-white text-black"
          }`}
          value={editData?.address || ""}
          onChange={(e) => onChangeField(user.id, "address", e.target.value)}
          disabled={isDeleted}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center">
        <button
          className={`px-4 py-1 rounded-md transition-colors ${
            isDeleted
              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          onClick={() => onToggleDelete(user.id)}
        >
          {isDeleted ? "復元" : "削除"}
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
