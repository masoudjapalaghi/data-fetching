import React, { useState, FC } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  tabs: Tab[];
}

const Tabs: FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="flex gap-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={activeTab === index ? "active_tab" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
