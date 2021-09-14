import {pool} from "../db";

export class HomeworkController {

    private getMonday(d = new Date()) {
        let date = new Date(d) || new Date();
        let day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    }

    public getHomeworksForWeek = async (req, res) => {
        const currentMonDate = this.getMonday();
        const page = req.params.page; // 1 - current 2 - next 3 - through the next 4 - last
        if (page < 1 || page > 4) {
            res.status(500).send({message: "Unknown page"});
        } else {
            const homeworksForWeek = {};
            for (let i = 1; i <= 7; i++) {
                const date = new Date(+(currentMonDate) + (86400000 * (i - 1)) + (86400000 * (+page - 1) * 7));
                const homework = await pool.query(
                    `SELECT * FROM shelp_homework WHERE ${'date'}=$1`,
                    [`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`]
                )
                homeworksForWeek[i] = homework.rows;
            }
            res.status(200).send(homeworksForWeek);
        }
    }

}