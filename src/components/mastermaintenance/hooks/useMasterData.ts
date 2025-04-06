// src/components/MasterMaintenance/hooks/useMasterData.ts
import { useState, useEffect } from "react";
import { UserData } from "../index";

// モックデータ（実際の実装では外部から取得）
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

export const useMasterData = (activeTab: string) => {
  const [data, setData] = useState<UserData[]>([]);
  const [editData, setEditData] = useState<{ [key: number]: UserData }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [nextId, setNextId] = useState<number>(100);
  const [isModified, setIsModified] = useState<boolean>(false);

  // タブ切り替え時のデータ取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
          setIsModified(false);

          // 次のIDを設定
          const maxId = newData.reduce(
            (max, item) => Math.max(max, item.id),
            0
          );
          setNextId(Math.max(maxId + 1, 100));
        }, 500);
      } catch (error) {
        console.error("データ取得エラー:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

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
    setIsModified(true);
  };

  // 全データ保存ハンドラ
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // 現在のタブの全データを取得
      const currentData = Object.values(editData);

      console.log("保存対象データ:", JSON.stringify(currentData, null, 2));

      // 成功したら更新（モック）
      setTimeout(() => {
        setData(currentData);
        setIsModified(false);
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

      handleChange(id, "isDeleted", newIsDeleted);

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

      setData((prev) => [...prev, newRecord]);
      setEditData((prev) => ({
        ...prev,
        [newRecord.id]: newRecord,
      }));

      setNextId((prev) => prev + 1);
      setIsModified(true);

      alert("新しいレコードを追加しました（保存するまで反映されません）");
    } catch (error) {
      console.error("レコード追加エラー:", error);
      alert("レコードの追加に失敗しました");
    }
  };

  return {
    data,
    editData,
    loading,
    saving,
    isModified,
    handleChange,
    handleSaveAll,
    toggleDeleteFlag,
    handleAddRecord
  };
};
