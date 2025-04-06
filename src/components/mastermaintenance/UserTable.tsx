// src/components/MasterMaintenance/UserTable.tsx
import { UserData } from "./index";
import UserTableRow from "./UserTableRow";

interface UserTableProps {
  data: UserData[];
  editData: { [key: number]: UserData };
  loading: boolean;
  onChangeField: (
    id: number,
    field: keyof UserData,
    value: string | number | boolean
  ) => void;
  onToggleDelete: (id: number) => void;
}

const UserTable = ({
  data,
  editData,
  loading,
  onChangeField,
  onToggleDelete,
}: UserTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            名前
          </th>
          <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            年齢
          </th>
          <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            性別
          </th>
          <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            住所
          </th>
          <th className="w-1/6 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            操作
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loading ? (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-black">読み込み中...</span>
              </div>
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
              データがありません
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <UserTableRow
              key={item.id}
              user={item}
              editData={editData[item.id]}
              onChangeField={onChangeField}
              onToggleDelete={onToggleDelete}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
