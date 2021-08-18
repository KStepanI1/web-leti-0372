import {HeaderNav} from "../molecules/HeaderNav";

type HeaderPropsType = {

}


const Header = (props: HeaderPropsType) => {

    return (
        <>
            <header className={`header`}>
                <div className='header__logo'>
                    <img src="" alt="Logo"/>
                </div>
                <HeaderNav component={'header'}
                         navItems={['Главная', 'Расписание', 'Преподаватели', 'Прослушка']} />
            </header>
        </>
    )
};

export { Header };