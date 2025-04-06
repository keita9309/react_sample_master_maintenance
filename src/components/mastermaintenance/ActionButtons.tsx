// src/components/MasterMaintenance/ActionButtons.tsx

interface ActionButtonsProps {
  isModified: boolean;
  saving: boolean;
  onAddRecord: () => void;
  onSaveAll: () => void;
}

const ActionButtons = ({
  isModified,
  saving,
  onAddRecord,
  onSaveAll,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={onAddRecord}
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
        onClick={onSaveAll}
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
  );
};

export default ActionButtons;
