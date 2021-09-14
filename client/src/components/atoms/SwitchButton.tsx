import {useState} from "react";

interface SwitchButtonProps {
    text: string | null;
    callback: Function;
    isInitialChecked: boolean | null;
}

export const SwitchButton = ({text, callback, isInitialChecked}: SwitchButtonProps) => {
    const [isChecked, setChecked] = useState(isInitialChecked);

    return (
        <div className={'switch-button'}>
            {text && <div className={'switch-button__text'}>
                {text}
            </div>}
            <label onChange={(event) => callback(event)} className="switch__label">
                <input type="checkbox"
                       onChange={(event: any) => setChecked(event.target.checked)}
                       checked={isChecked || false}/>
                <span className="switch__slider"></span>
            </label>
        </div>
    );
}