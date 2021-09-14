import { motion } from "framer-motion";
import { useState } from "react";

interface DropdownProps {
    items: { label: string, value: string }[];
    onChangeCallback?: any;
}

export const Dropdown = ({ items, onChangeCallback }: DropdownProps) => {

    return (
        <select className={`dropdown`} onChange={onChangeCallback}>
            {items.map((item, i) => {
                return <option key={`${item.value}_${i + 1}`}
                               value={item.value}
                               className={'dropdown__item'}>
                    {item.label}
                </option>
            })
            }
        </select>
    );
}