import {pool} from "../db";

export class SubjectController {

   public async getSubjectById(req, res) {
       const id = req.params.id;
       const subject = await pool.query('SELECT * FROM shelp_subject WHERE id=$1', [id]);
       res.send(subject.rows[0]);
   }

    public async getAllSubjects(req, res) {
        const subjects = await pool.query('SELECT * FROM shelp_subject');
        res.send(subjects.rows);
    }

}