import { useSelector } from "react-redux";
import { StateType } from "../../redux/store";
import { DayHomework } from "../organisms/DayHomework";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

const HomeworksPage = () => {
    const allSubjects = useSelector((state: StateType) => state.subject.allSubjects);

    return (
        <div className={'homeworks-page'}>
            <Header />
            <main className={'homeworks-page__content'}>
                <h1 className={'homeworks-page__title'}>Домашние задания</h1>
                {allSubjects
                    ? <div className={'homeworks-page__homeworks-box'}>
                        <DayHomework />
                    </div>
                    : <div></div>
                }
            </main>
            <Footer />
        </div>
    );
}

export default HomeworksPage;