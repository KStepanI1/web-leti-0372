import React, {FC, useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StateType } from '../../redux/store';
import { SwitchButton } from '../atoms/SwitchButton';

interface NavItem {
    link: string;
    name: string;
}

interface HeaderNavPropsType {
    navItems: Array<NavItem>;
}

const HeaderNav: FC<HeaderNavPropsType> = (props: HeaderNavPropsType): JSX.Element => {
    const theme = localStorage.getItem("theme");
    let isChecked = theme === "dark";

    const switchTheme = (event: any) => {
        const checked = event.target.checked;

        if (checked) {
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    return (
            <div className={`header__nav`}>
                <ul className={'nav__items'}>
                    <NavLink className={'nav__link-item'} to={'/'} exact
                             activeClassName={'nav__link-item_active'}>
                        <li className={'nav__item'}>
                            Главная
                        </li>
                    </NavLink>
                    { props.navItems.map((item, i) => {
                        return (
                            <NavLink className={'nav__link-item'} key={item.name + `${i}`} to={item.link}
                                     activeClassName={'nav__link-item_active'}>
                                <li className={'nav__item'}>
                                    {item.name}
                                </li>
                            </NavLink>
                        );
                    })}
                </ul>

                <SwitchButton text={'Темная тема'} callback={switchTheme} isInitialChecked={theme === "dark"}/>
            </div>
    );
};

export {HeaderNav};