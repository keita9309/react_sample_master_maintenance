// Note:コンポーネントを分類したため、当コンポーネントは現在不使用
import { useState, useEffect } from "react";

// タブの定義
interface TabDefinition {
  id: string;
  label: string;
}

// データの型定義
interface UserData {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  isDeleted?: boolean; // 削除フラグを追加
}

const Tab = () => {
  // タブ一覧
  const tabs: TabDefinition[] = [
    { id: "tabA", label: "A" },
    { id: "tabB", label: "B" },
    { id: "tabC", label: "C" },
    { id: "tabD", label: "D" },
  ];

  // 状態管理
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [data, setData] = useState<UserData[]>([]);
  const [editData, setEditData] = useState<{ [key: number]: UserData }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false); // 保存中状態を追加
  const [nextId, setNextId] = useState<number>(100); // 新規レコードのID開始値
  const [isModified, setIsModified] = useState<boolean>(false); // データ変更フラグ

  // タブ切り替え時のデータ取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 実際の実装ではここでAPIリクエスト
        // 例: const response = await fetch(`/api/master/${activeTab}`);

        // モックデータ（実際の実装では削除）
        const mockData: Record<string, UserData[]> = {
          tabA: [
            {
              id: 1,
              name: "山田太郎",
              age: 30,
              gender: "男性",
              address: "東京都新宿区",
              isDeleted: false,
            },
            {
              id: 2,
              name: "佐藤花子",
              age: 25,
              gender: "女性",
              address: "東京都渋谷区",
              isDeleted: false,
            },
          ],
          tabB: [
            {
              id: 3,
              name: "鈴木一郎",
              age: 42,
              gender: "男性",
              address: "大阪府大阪市",
              isDeleted: false,
            },
            {
              id: 4,
              name: "田中美咲",
              age: 35,
              gender: "女性",
              address: "京都府京都市",
              isDeleted: false,
            },
          ],
          tabC: [
            {
              id: 5,
              name: "高橋健太",
              age: 28,
              gender: "男性",
              address: "神奈川県横浜市",
              isDeleted: false,
            },
            {
              id: 6,
              name: "伊藤由美",
              age: 33,
              gender: "女性",
              address: "埼玉県さいたま市",
              isDeleted: false,
            },
          ],
          tabD: [
            {
              id: 7,
              name: "渡辺隆",
              age: 45,
              gender: "男性",
              address: "北海道札幌市",
              isDeleted: false,
            },
            {
              id: 8,
              name: "小林直子",
              age: 27,
              gender: "女性",
              address: "福岡県福岡市",
              isDeleted: false,
            },
          ],
        };

        // モックデータを使用（実際の実装では削除）
        setTimeout(() => {
          const newData = mockData[activeTab] || [];
          setData(newData);

          // 編集用データの初期化
          const newEditData: { [key: number]: UserData } = {};
          newData.forEach((item) => {
            newEditData[item.id] = { ...item };
          });
          setEditData(newEditData);

          setLoading(false);
          setIsModified(false); // 新しいデータを読み込んだので変更フラグをリセット

          // 次のIDを設定（実際の実装では不要かも）
          const maxId = newData.reduce(
            (max, item) => Math.max(max, item.id),
            0
          );
          setNextId(maxId + 1);
        }, 500);

        // 実際の実装ではこのようにAPI応答を処理
        // const result = await response.json();
        // setData(result);
        // const newEditData: { [key: number]: UserData } = {};
        // result.forEach(item => {
        //   newEditData[item.id] = { ...item };
        // });
        // setEditData(newEditData);
        // setIsModified(false); // 新しいデータを読み込んだので変更フラグをリセット
        // const maxId = result.reduce((max, item) => Math.max(max, item.id), 0);
        // setNextId(maxId + 1);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        // setLoading(false); // 実際の実装ではここでローディングを解除
      }
    };

    fetchData();
  }, [activeTab]);

  // タブ切り替え前の確認
  const handleTabChange = (newTabId: string) => {
    if (isModified) {
      const confirmed = window.confirm(
        "変更内容が保存されていません。保存せずに移動しますか？"
      );
      if (!confirmed) return;
    }
    setActiveTab(newTabId);
  };

  // 入力変更ハンドラ
  const handleChange = (
    id: number,
    field: keyof UserData,
    value: string | number | boolean
  ) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    setIsModified(true); // 変更フラグを立てる
  };

  // 全データ保存ハンドラ
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // 現在のタブの全データを取得（削除されたものも含む）
      const currentData = Object.values(editData);

      console.log("保存対象データ:", JSON.stringify(currentData, null, 2));

      // 実際の実装ではここでAPIリクエスト
      // const response = await fetch(`/api/master/${activeTab}/batch`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(currentData),
      // });

      // if (!response.ok) throw new Error('更新に失敗しました');
      // const result = await response.json();

      // 成功したら更新
      setTimeout(() => {
        // データを更新
        setData(currentData);
        setIsModified(false); // 変更フラグをリセット
        setSaving(false);
        alert(`${activeTab.replace("tab", "タブ ")} のデータを保存しました`);
      }, 800);
    } catch (error) {
      console.error("保存エラー:", error);
      alert("データの保存に失敗しました");
      setSaving(false);
    }
  };

  // 削除フラグの切り替えハンドラ
  const toggleDeleteFlag = async (id: number) => {
    try {
      const currentIsDeleted = editData[id]?.isDeleted || false;
      const newIsDeleted = !currentIsDeleted;

      // 編集データを更新
      handleChange(id, "isDeleted", newIsDeleted);

      // 状態に応じたメッセージ
      const message = newIsDeleted
        ? `ID: ${id} を削除しました（保存するまで反映されません）`
        : `ID: ${id} の削除を解除しました（保存するまで反映されません）`;
      alert(message);
    } catch (error) {
      console.error("ステータス更新エラー:", error);
      alert("ステータスの更新に失敗しました");
    }
  };

  // 新規レコード追加ハンドラ
  const handleAddRecord = async () => {
    try {
      const newRecord: UserData = {
        id: nextId,
        name: `新規ユーザー_${nextId}`,
        age: 20,
        gender: "未設定",
        address: "",
        isDeleted: false,
      };

      // データとeditDataを更新
      setData((prev) => [...prev, newRecord]);
      setEditData((prev) => ({
        ...prev,
        [newRecord.id]: newRecord,
      }));

      // 次のID更新
      setNextId((prev) => prev + 1);
      setIsModified(true); // 変更フラグを立てる

      alert("新しいレコードを追加しました（保存するまで反映されません）");
    } catch (error) {
      console.error("レコード追加エラー:", error);
      alert("レコードの追加に失敗しました");
    }
  };

  // 色スキームを無効化するスタイル
  const colorSchemeStyle = `
    :root {
      color-scheme: light only;
    }
  `;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-black">
      {/* 色スキームを設定するスタイル要素 */}
      <style>{colorSchemeStyle}</style>

      <h1 className="text-2xl font-bold mb-6 text-black">マスタメンテナンス</h1>

      {/* タブナビゲーション */}
      <div className="flex mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 px-6 py-3 border-t border-l border-r rounded-t-lg text-lg font-medium transition
              ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* データテーブル */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-black">
            {activeTab.replace("tab", "タブ ")} データ一覧
          </h2>
          <div className="flex gap-2">
            <button
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={handleAddRecord}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              新規追加
            </button>
            <button
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isModified
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSaveAll}
              disabled={!isModified || saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  保存中...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  全て保存
                </>
              )}
            </button>
          </div>
        </div>
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
              data.map((item) => {
                const isDeleted = editData[item.id]?.isDeleted || false;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 ${
                      isDeleted ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        isDeleted ? "text-gray-500" : "text-black"
                      }`}
                    >
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="text"
                        className={`w-full px-2 py-1 border rounded-md ${
                          isDeleted
                            ? "bg-gray-100 text-gray-500"
                            : "bg-white text-black"
                        }`}
                        value={editData[item.id]?.name || ""}
                        onChange={(e) =>
                          handleChange(item.id, "name", e.target.value)
                        }
                        disabled={isDeleted}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        className={`w-full px-2 py-1 border rounded-md ${
                          isDeleted
                            ? "bg-gray-100 text-gray-500"
                            : "bg-white text-black"
                        }`}
                        value={editData[item.id]?.age || ""}
                        onChange={(e) =>
                          handleChange(
                            item.id,
                            "age",
                            parseInt(e.target.value) || 0
                          )
                        }
                        disabled={isDeleted}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        className={`w-full px-2 py-1 border rounded-md ${
                          isDeleted
                            ? "bg-gray-100 text-gray-500"
                            : "bg-white text-black"
                        }`}
                        value={editData[item.id]?.gender || ""}
                        onChange={(e) =>
                          handleChange(item.id, "gender", e.target.value)
                        }
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
                          isDeleted
                            ? "bg-gray-100 text-gray-500"
                            : "bg-white text-black"
                        }`}
                        value={editData[item.id]?.address || ""}
                        onChange={(e) =>
                          handleChange(item.id, "address", e.target.value)
                        }
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
                        onClick={() => toggleDeleteFlag(item.id)}
                      >
                        {isDeleted ? "復元" : "削除"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tab;
