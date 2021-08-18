
type HeaderNavPropsType = {
    component: string;
    navItems: Array<string>;
}

const HeaderNav = (props: HeaderNavPropsType) => {
    return (
        <>
            <div className={`${props.component}__main-nav`}>
                <ul className={'main-nav__items'}>
                    { props.navItems.map(item => {
                        return (
                            <li className={'main-nav__item'}>
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export {HeaderNav};