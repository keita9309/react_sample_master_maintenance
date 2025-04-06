// src/components/MasterMaintenance/index.tsx
import { useState } from "react";
import TabNavigation from "./TabNavigation";
import ActionButtons from "./ActionButtons";
import UserTable from "./UserTable";
import { useMasterData } from "./hooks/useMasterData";

// タブの定義
export interface TabDefinition {
  id: string;
  label: string;
}

// データの型定義（共有)
export interface UserData {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  isDeleted?: boolean;
}

const MasterMaintenance = () => {
  // タブ一覧
  const tabs: TabDefinition[] = [
    { id: "tabA", label: "A" },
    { id: "tabB", label: "B" },
    { id: "tabC", label: "C" },
    { id: "tabD", label: "D" },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  const {
    data,
    loading,
    saving,
    isModified,
    handleAddRecord,
    handleSaveAll,
    handleChange,
    toggleDeleteFlag,
    editData,
  } = useMasterData(activeTab);

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

  // 色スキームを無効化するスタイル
  const colorSchemeStyle = `
    :root {
      color-scheme: light only;
    }
  `;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-black">
      <style>{colorSchemeStyle}</style>
      <h1 className="text-2xl font-bold mb-6 text-black">マスタメンテナンス</h1>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-black">
            {activeTab.replace("tab", "タブ ")} データ一覧
          </h2>

          <ActionButtons
            isModified={isModified}
            saving={saving}
            onAddRecord={handleAddRecord}
            onSaveAll={handleSaveAll}
          />
        </div>

        <UserTable
          data={data}
          editData={editData}
          loading={loading}
          onChangeField={handleChange}
          onToggleDelete={toggleDeleteFlag}
        />
      </div>
    </div>
  );
};

export default MasterMaintenance;
