import { ReactNode, useState } from 'react';
import style from './style.module.scss';

type Props = {
    tabs: Tab[];
};

type Tab = {
    name: string;
    icon: ReactNode;
    content: ReactNode;
};

export default function SideBar(props: Props) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const switchTab = (idx: number): (() => void) => {
        return function () {
            setCurrentTab(idx);
        };
    };
    return (
        <div className={style.sidebar}>
            <div className={style.navigation}>
                {props.tabs.map((tab, idx) => {
                    return (
                        <button
                            key={`${tab.name}_${idx}`}
                            onClick={switchTab(idx)}
                            className={style.navitem}
                        >
                            {tab.icon}
                        </button>
                    );
                })}
            </div>
            <div className={style.container}>
                {props.tabs[currentTab].content}
            </div>
        </div>
    );
}
