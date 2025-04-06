// src/components/MasterMaintenance/TabNavigation.tsx
import { TabDefinition } from "./index";

interface TabNavigationProps {
  tabs: TabDefinition[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  return (
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
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
