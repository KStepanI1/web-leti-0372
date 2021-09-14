
export const getNormalLessonType = (type: string) => {
    switch(type) {
        case "lec": return 'Лек';
        case "prac": return "Пр";
        case "seminar": return "Сем";
        case "lab": return "Лаб";
        default: return '';
    }
}