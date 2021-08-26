import React, {FC} from 'react'
import { NavLink } from 'react-router-dom';

interface NavItem {
    link: string;
    name: string;
}

interface HeaderNavPropsType {
    navItems: Array<NavItem>;
}

const HeaderNav: FC<HeaderNavPropsType> = (props: HeaderNavPropsType): JSX.Element => {
    return (
        <>
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
            </div>
        </>
    );
};

export {HeaderNav};