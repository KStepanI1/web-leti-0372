import {pool} from "../db";

class TimetableController {

    getEvenTimetableForDay = async (req, res) => {
        const dayNumber = req.params.dayNumber;
        const timetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE weekday_id=$1 AND even_week=$2',
            [dayNumber, true]);
        try {
            let timetableProcessed = await this.processTimetable(timetable);
            Promise.all(timetableProcessed)
                .then((response) => res.send(response))
                .catch(error => res.send(error.status));
        } catch(error) {
            console.error(error);
        }
    }

    getOddTimetableForDay = async (req, res) => {
        const dayNumber = req.params.dayNumber;
        const timetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE weekday_id=$1 AND odd_week=$2',
            [dayNumber, true]);
        try {
            let timetableProcessed = await this.processTimetable(timetable);
            Promise.all(timetableProcessed)
                .then((response) => res.send(response))
                .catch(error => res.send(error.status));
        } catch(error) {
            console.error(error);
        }
    }

    getAllOddTimetable = async (req, res) => {
        const timetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE odd_week=$1',
            [true]);
        try {
            let timetableProcessed = await this.processTimetable(timetable);
            Promise.all(timetableProcessed)
                .then((response) => res.send(response))
                .catch(error => res.send(error.status));
        } catch(error) {
            console.error(error);
        }
    }

    getAllEvenTimetable = async (req, res) => {
        const timetable = await pool.query(
            'SELECT * FROM shelp_timetable WHERE even_week=$1',
            [true]);
        try {
            let timetableProcessed = await this.processTimetable(timetable);
            Promise.all(timetableProcessed)
                .then((response) => res.send(response))
                .catch(error => res.send(error.status));
        } catch(error) {
            console.error(error);
        }
    }

    async processTimetable(timetable: any) {
        return await timetable.rows.map(async tSubject => {
            const subjectName = await pool.query(
                'SELECT (name) FROM shelp_subject WHERE id=$1',
                [tSubject.subject_id]);
            const zoomLinks = await pool.query(
                'SELECT * FROM shelp_zoomlink WHERE subject_id=$1',
                [tSubject.subject_id]);
            return {
                ...tSubject,
                ...subjectName.rows[0],
                zoomLinks: zoomLinks.rows
            }
        });
    }

}

export {TimetableController};