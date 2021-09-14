
interface TypeContainerProps {
    classes?: string;
    type: string;
    typeRus: string;
}


export const TypeContainer = ({ classes, type, typeRus }: TypeContainerProps) => {
    return (
        <div className={`${classes} type-container ${type}`}>
            <h3 className={'type-name'}>{typeRus}</h3>
        </div>
    );
}