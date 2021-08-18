import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

const MainPage = () => {

    return (
        <div className={'main-page'}>
            <Header />
            <main className={'main-page__content'}>

            </main>
            <Footer />
        </div>
    );
};

export { MainPage };