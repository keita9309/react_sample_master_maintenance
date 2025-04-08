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
  isNew?: boolean; // 新規追加フラグ
  isDeleted?: boolean; // 削除フラグ（既存のレコード用）
}

// タブごとのデータを管理する型
interface AllTabsData {
  [tabId: string]: UserData[];
}

// 編集中のデータを管理する型
interface EditDataByTab {
  [tabId: string]: { [key: number]: UserData };
}

// モーダルの状態を管理する型
interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  showCancelButton?: boolean; // キャンセルボタンの表示制御用
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

  // モーダル状態管理
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    showCancelButton: true,
  });

  // モーダルを開く関数
  const openModal = (
    title: string,
    message: string,
    onConfirm: () => void,
    showCancelButton: boolean = true
  ) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      showCancelButton,
    });
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // モーダルの確認ボタンのハンドラ
  const handleConfirm = () => {
    modal.onConfirm();
    closeModal();
  };

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
      openModal(
        "確認",
        "変更内容が保存されていません。保存せずに移動しますか？",
        () => {
          setActiveTab(newTabId);
        }
      );
    } else {
      setActiveTab(newTabId);
    }
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
      // 現在のタブの全データを取得（新規追加された後に削除されたものは除外する）
      const currentData = Object.values(editDataByTab[activeTab]).filter(
        (item) => !(item.isNew && item.isDeleted)
      ); // 新規追加後削除されたデータは除外

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

        // 編集データも更新（物理削除されたデータを反映）
        const newEditDataByTab = { ...editDataByTab };
        newEditDataByTab[activeTab] = {};
        currentData.forEach((item) => {
          newEditDataByTab[activeTab][item.id] = { ...item };
        });
        setEditDataByTab(newEditDataByTab);

        setIsModifiedByTab((prev) => ({
          ...prev,
          [activeTab]: false,
        }));

        setSaving(false);

        // 成功モーダルを表示（はいボタンのみ）
        setModal({
          isOpen: true,
          title: "保存完了",
          message: `${activeTab.replace(
            "tab",
            "タブ "
          )} のデータを保存しました`,
          onConfirm: () => {},
          showCancelButton: false, // キャンセルボタンを非表示に
        });
      }, 800);
    } catch (error) {
      console.error("保存エラー:", error);
      openModal("エラー", "データの保存に失敗しました", () => {});
      setSaving(false);
    }
  };

  // 新規レコード削除ハンドラ
  const handleDeleteNewRecord = (id: number) => {
    openModal(
      "削除確認",
      `ID: ${id} のレコードを削除しますか？（保存するまで反映されません）`,
      () => {
        try {
          // 新規レコードを削除フラグを立てて非表示にする（保存時に物理削除される）
          setEditDataByTab((prev) => ({
            ...prev,
            [activeTab]: {
              ...prev[activeTab],
              [id]: {
                ...prev[activeTab][id],
                isDeleted: true,
              },
            },
          }));

          // 変更フラグを立てる
          setIsModifiedByTab((prev) => ({
            ...prev,
            [activeTab]: true,
          }));
        } catch (error) {
          console.error("削除エラー:", error);
          openModal("エラー", "レコードの削除に失敗しました", () => {});
        }
      }
    );
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
        isNew: true, // 新規追加フラグを設定
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

      // アラートメッセージを削除
    } catch (error) {
      console.error("レコード追加エラー:", error);
      openModal("エラー", "レコードの追加に失敗しました", () => {});
    }
  };

  // 表示するデータを取得（削除フラグが立っている新規データは除外）
  const displayData = () => {
    if (!allTabsData[activeTab]) return [];

    return Object.values(editDataByTab[activeTab] || {})
      .filter((item) => !(item.isDeleted && item.isNew)) // 削除された新規レコードは表示しない
      .sort((a, b) => a.id - b.id); // ID順にソート
  };

  const isModified = isModifiedByTab[activeTab] || false;

  // 色スキームを無効化するスタイル
  const colorSchemeStyle = `
    :root {
      color-scheme: light only;
    }
  `;

  // モーダルとオーバーレイのスタイル
  const modalStyles = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 400px;
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 24px;
      border-bottom: 1px solid #e2e8f0;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a202c;
    }

    .modal-body {
      padding: 24px;
      color: #4a5568;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .modal-btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .modal-btn-secondary {
      background-color: #e2e8f0;
      color: #4a5568;
    }

    .modal-btn-secondary:hover {
      background-color: #cbd5e0;
    }

    .modal-btn-primary {
      background-color: #3182ce;
      color: white;
    }

    .modal-btn-primary:hover {
      background-color: #2b6cb0;
    }
  `;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white text-gray-800">
      {/* スタイル要素 */}
      <style>{colorSchemeStyle}</style>
      <style>{modalStyles}</style>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        マスタメンテナンス
      </h1>

      {/* タブナビゲーション */}
      <div className="flex mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 text-lg font-medium transition duration-200 mx-1 first:ml-0 rounded-t-lg
              ${
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-700 border-t border-l border-r border-indigo-200 -mb-px"
                  : "bg-gray-50 text-gray-600 hover:text-gray-800 hover:bg-gray-100 border-t border-l border-r border-gray-200"
              }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* データテーブル */}
      <div className="bg-white rounded-lg shadow overflow-hidden relative">
        <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            {activeTab.replace("tab", "タブ ")} データ一覧
          </h2>
          <div className="flex gap-3">
            <button
              className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition shadow-sm"
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
              className={`flex items-center px-3 py-2 rounded-md transition-colors shadow-sm ${
                isModified
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
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
        <style>{`
          .table-container {
            width: 100%;
            overflow-x: auto;
          }
          .data-table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
          }
          .name-col { width: 20%; }
          .age-col { width: 20%; }
          .gender-col { width: 20%; }
          .address-col { width: 40%; }
          .action-col {
            width: 80px;
            min-width: 80px;
            max-width: 80px;
          }
        `}</style>
        <div className="table-container">
          <table className="data-table divide-y divide-gray-200">
            <colgroup>
              <col className="name-col" />
              <col className="age-col" />
              <col className="gender-col" />
              <col className="address-col" />
              <col className="action-col" />
            </colgroup>
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  名前
                </th>
                <th className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  年齢
                </th>
                <th className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  性別
                </th>
                <th className="w-2/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  住所
                </th>
                {/* 削除ボタン用の余白 - 常に表示 */}
                <th className="w-16 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider action-col"></th>
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
              ) : displayData().length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    データがありません
                  </td>
                </tr>
              ) : (
                displayData().map((item) => {
                  const isNewRecord = item.isNew || false;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition duration-150 bg-white group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition bg-white text-gray-800"
                          value={item.name || ""}
                          onChange={(e) =>
                            handleChange(item.id, "name", e.target.value)
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition bg-white text-gray-800"
                          value={item.age || ""}
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              "age",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition bg-white text-gray-800"
                          value={item.gender || ""}
                          onChange={(e) =>
                            handleChange(item.id, "gender", e.target.value)
                          }
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
                          className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition bg-white text-gray-800"
                          value={item.address || ""}
                          onChange={(e) =>
                            handleChange(item.id, "address", e.target.value)
                          }
                        />
                      </td>
                      {/* 削除ボタン列 - 常に表示されるセル */}
                      <td className="w-16 px-6 py-4 whitespace-nowrap text-sm text-center action-col">
                        {isNewRecord && (
                          <button
                            className="p-2 rounded-md transition-colors bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center shadow-sm mx-auto"
                            onClick={() => handleDeleteNewRecord(item.id)}
                            title="レコードを削除"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* モーダルダイアログ */}
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">{modal.title}</h3>
            </div>
            <div className="modal-body">
              <p>{modal.message}</p>
            </div>
            <div className="modal-footer">
              {modal.showCancelButton && (
                <button
                  className="modal-btn modal-btn-secondary"
                  onClick={closeModal}
                >
                  いいえ
                </button>
              )}
              <button
                className="modal-btn modal-btn-primary"
                onClick={handleConfirm}
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;
