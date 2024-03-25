interface SubsystemTitleProps {
    name: string;
}

export const SubsystemTitle = ({ name }: SubsystemTitleProps) => {
    return (
        <div className="subsystem__title">
            <p>Subsistema</p>
            <h2>{name}</h2>
        </div>
    );
};
