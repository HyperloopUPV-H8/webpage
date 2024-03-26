import { ReactNode, useState } from 'react';

type Props = {
    tabs: Tab[];
};

type Tab = {
    name: string;
    icon: ReactNode;
    content: ReactNode;
};

export const SideBar = (props: Props) => {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const switchTab = (idx: number): (() => void) => {
        return function () {
            setCurrentTab(idx);
        };
    };
    return (
        <div className="sidebar">
            <div className="sidebar__navigation">
                {props.tabs.map((tab, idx) => {
                    return (
                        <button
                            key={`${tab.name}_${idx}`}
                            onClick={switchTab(idx)}
                            className="sidebar__navitem"
                        >
                            {tab.icon}
                        </button>
                    );
                })}
            </div>
            <div className="sidebar__content">
                {props.tabs[currentTab].content}
            </div>
        </div>
    );
};
