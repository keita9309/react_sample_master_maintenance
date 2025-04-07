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
  isDeleted?: boolean; // 削除フラグ
}

// タブごとのデータを管理する型
interface AllTabsData {
  [tabId: string]: UserData[];
}

// 編集中のデータを管理する型
interface EditDataByTab {
  [tabId: string]: { [key: number]: UserData };
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
  const [allTabsData, setAllTabsData] = useState<AllTabsData>({});
  const [editDataByTab, setEditDataByTab] = useState<EditDataByTab>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [nextIds, setNextIds] = useState<{ [tabId: string]: number }>({});
  const [isModifiedByTab, setIsModifiedByTab] = useState<{
    [tabId: string]: boolean;
  }>({});
  const [initialDataFetched, setInitialDataFetched] = useState<boolean>(false);

  // 初期表示時に全タブのデータを一度に取得
  useEffect(() => {
    const fetchAllData = async () => {
      if (initialDataFetched) return; // 既にデータ取得済みの場合は何もしない

      setLoading(true);
      try {
        // 実際の実装ではここで全タブのデータを一度に取得するAPIリクエスト
        // 例: const response = await fetch('/api/master/all');

        // モックデータ（実際の実装では削除）
        const mockData: AllTabsData = {
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
          // 全タブのデータをセット
          setAllTabsData(mockData);

          // 編集用データの初期化
          const newEditDataByTab: EditDataByTab = {};
          const newNextIds: { [tabId: string]: number } = {};
          const newIsModifiedByTab: { [tabId: string]: boolean } = {};

          // 各タブごとに初期化
          Object.keys(mockData).forEach((tabId) => {
            // 編集用データの作成
            newEditDataByTab[tabId] = {};
            mockData[tabId].forEach((item) => {
              newEditDataByTab[tabId][item.id] = { ...item };
            });

            // 次のIDを設定
            const maxId = mockData[tabId].reduce(
              (max, item) => Math.max(max, item.id),
              0
            );
            newNextIds[tabId] = maxId + 1;

            // 変更フラグの初期化
            newIsModifiedByTab[tabId] = false;
          });

          setEditDataByTab(newEditDataByTab);
          setNextIds(newNextIds);
          setIsModifiedByTab(newIsModifiedByTab);
          setLoading(false);
          setInitialDataFetched(true); // データ取得完了フラグをセット

          // 実際の実装ではこのようにAPI応答を処理
          // const result = await response.json();
          // setAllTabsData(result);
          // ... 同様の処理 ...
        }, 800);
      } catch (error) {
        console.error("データ取得エラー:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [initialDataFetched]);

  // タブ切り替え前の確認
  const handleTabChange = (newTabId: string) => {
    if (isModifiedByTab[activeTab]) {
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
    setEditDataByTab((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [id]: {
          ...prev[activeTab][id],
          [field]: value,
        },
      },
    }));
    setIsModifiedByTab((prev) => ({
      ...prev,
      [activeTab]: true,
    }));
  };

  // 全データ保存ハンドラ
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // 現在のタブの全データを取得（削除されたものも含む）
      const currentData = Object.values(editDataByTab[activeTab]);

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
        // allTabsDataを更新
        setAllTabsData((prev) => ({
          ...prev,
          [activeTab]: currentData,
        }));

        setIsModifiedByTab((prev) => ({
          ...prev,
          [activeTab]: false,
        }));

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
      const currentIsDeleted = editDataByTab[activeTab][id]?.isDeleted || false;
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
      const newId = nextIds[activeTab];
      const newRecord: UserData = {
        id: newId,
        name: `新規ユーザー_${newId}`,
        age: 20,
        gender: "未設定",
        address: "",
        isDeleted: false,
      };

      // allTabsDataとeditDataByTabを更新
      setAllTabsData((prev) => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), newRecord],
      }));

      setEditDataByTab((prev) => ({
        ...prev,
        [activeTab]: {
          ...(prev[activeTab] || {}),
          [newRecord.id]: newRecord,
        },
      }));

      // 次のID更新
      setNextIds((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab] + 1,
      }));

      // 変更フラグを立てる
      setIsModifiedByTab((prev) => ({
        ...prev,
        [activeTab]: true,
      }));

      alert("新しいレコードを追加しました（保存するまで反映されません）");
    } catch (error) {
      console.error("レコード追加エラー:", error);
      alert("レコードの追加に失敗しました");
    }
  };

  // 現在のタブのデータを取得
  const currentTabData = allTabsData[activeTab] || [];
  const isModified = isModifiedByTab[activeTab] || false;

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
              disabled={loading}
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
              disabled={!isModified || saving || loading}
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
            ) : currentTabData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  データがありません
                </td>
              </tr>
            ) : (
              currentTabData.map((item) => {
                const isDeleted =
                  editDataByTab[activeTab]?.[item.id]?.isDeleted || false;
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
                        value={editDataByTab[activeTab]?.[item.id]?.name || ""}
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
                        value={editDataByTab[activeTab]?.[item.id]?.age || ""}
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
                        value={
                          editDataByTab[activeTab]?.[item.id]?.gender || ""
                        }
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
                        value={
                          editDataByTab[activeTab]?.[item.id]?.address || ""
                        }
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
