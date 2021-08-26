import {pool} from "../db";

export class TimetableController {

    public async getEvenWeekTimetableForDay(req, res) {
        const dayNumber = req.params.dayNumber;
        let timetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE even_week=$1 AND weekday_id=$2',
            [true, dayNumber]);
        console.log(timetable);
        if (timetable.rows.length > 0) {
            const timetableProcessed = await timetable.rows.map(async subject => {
                const subjectName = await pool.query('SELECT (name) FROM shelp_subject WHERE id=$1', [subject.subject_id]);
                return {
                    ...subject,
                    ...subjectName.rows[0]
                }
            })
            Promise.all(timetableProcessed).then(response => {
                res.send(response);
            });
        } else {
            res.send(timetable.rows);
        }
    }

    public async getOddWeekTimetableForDay(req, res) {
        const dayNumber = req.params.dayNumber;
        const timetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE odd_week=$1 AND weekday_id=$2',
            [true, dayNumber]);
        if (timetable.rows.length > 0) {
            const timetableProcessed = await timetable.rows.map(async subject => {
                const subjectName = await pool.query('SELECT (name) FROM shelp_subject WHERE id=$1', [subject.subject_id]);
                return {
                    ...subject,
                    ...subjectName.rows[0]
                }
            })
            Promise.all(timetableProcessed).then(response => {
                res.send(response);
            });
        } else {
            res.send(timetable.rows);
        }
    }

    public async getEvenWeekTimetable(req, res) {
        const evenWeekTimetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE even_week=$1',
            [true]);
        if (evenWeekTimetable.rows.length > 0) {
            const timetableProcessed = await evenWeekTimetable.rows.map(async subject => {
                const subjectName = await pool.query('SELECT (name) FROM shelp_subject WHERE id=$1', [subject.subject_id]);
                return {
                    ...subject,
                    ...subjectName.rows[0]
                }
            })
            Promise.all(timetableProcessed).then(response => {
                res.send(response);
            });
        } else {
            res.send(evenWeekTimetable.rows);
        }
    }

    public async getOddWeekTimetable(req, res) {
        const oddWeekTimetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE odd_week=$1',
            [true]);
        if (oddWeekTimetable.rows.length > 0) {
            const timetableProcessed = await oddWeekTimetable.rows.map(async subject => {
                const subjectName = await pool.query('SELECT (name) FROM shelp_subject WHERE id=$1', [subject.subject_id]);
                return {
                    ...subject,
                    ...subjectName.rows[0]
                }
            })
            Promise.all(timetableProcessed).then(response => {
                res.send(response);
            });
        } else {
            res.send(oddWeekTimetable.rows);
        }
    }


}