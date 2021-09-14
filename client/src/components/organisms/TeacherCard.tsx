import { SubjectType } from "../../redux/reducers/subjectReducer";
import { TeacherType } from "../../redux/reducers/teacherReducer";
import { TypeContainer } from "../atoms/TypeContainer";

interface TeacherCardProps {
    teacher: TeacherType;
    subject: string;
}


export const TeacherCard = ({ teacher, subject }: TeacherCardProps) => {

    const getNormalLessonType = (type: string) => {
        const types = type.replace(",", " ").split(" ");
        const typesProcessed: { value: string; label: string; }[] = [];
        for (let i = 0; i < types.length; i++) {
            switch(types[i]) {
                case "lec": typesProcessed.push({ value: 'lec', label: 'Лек' }); break;
                case "prac": typesProcessed.push({ value: 'prac', label: 'Пр' }); break;
                case "seminar": typesProcessed.push({ value: 'seminar', label: 'Сем' }); break;
                case "lab": typesProcessed.push({ value: 'lab', label: 'Лаб' }); break;
                default: return [{ value: '', label: '' }];
            }
        }
        return typesProcessed;
    }

    const types = getNormalLessonType(teacher.type);

    return (
        <div className={'teacher-card'}>
            <h2 className={'teacher__fullname'}>{teacher.last_name} {teacher.first_name} {teacher.middle_name}</h2>
            <div className={'teacher__subject-info'}>
                <h3 className={'teacher-card__subtitle'}>Ведет: </h3>
                <div className={'subject-n-type'}>
                    <div className={'teacher__subject'}>{subject}</div>
                    <div className={'teacher__types'}>
                        {types && types !== [] && types.map((type, i) =>
                            <TypeContainer key={`${type.label}_${type.value}_${i + 1}`}
                                           classes={''}
                                           type={type.value}
                                           typeRus={type.label}/>)
                        }
                    </div>
                </div>
            </div>
            <div className={'teacher__email-info'}>
                <h3 className={'teacher-card__subtitle'}>Почта: </h3>
                <div className={'teacher__email'}>{teacher.email}</div>
            </div>
        </div>
    );
}