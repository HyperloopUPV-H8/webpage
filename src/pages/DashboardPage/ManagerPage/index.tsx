import DashboardNavbar from '../../../components/DashboardNavbar';
import PartnersEdit from '../PartnersEdit';

type Props = {
    username: string;
    password: string;
    onSignOut: () => void;
};

export default function ManagerPage(props: Props) {
    return (
        <div className="dashboard__page">
            <DashboardNavbar
                tabs={[
                    {
                        name: 'Partners',
                        content: (
                            <PartnersEdit
                                username={props.username}
                                password={props.password}
                            />
                        ),
                    },
                    {
                        name: 'Members',
                        content: <div style={{ color: 'white' }}>MEMBERS</div>,
                    },
                ]}
                onSignOut={props.onSignOut}
                username={props.username}
            ></DashboardNavbar>
        </div>
    );
}
