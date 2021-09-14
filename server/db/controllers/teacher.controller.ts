"use strict";
import {pool} from "../db";

export class TeacherController {

    public async getAllTeachers(req, res) {
        const teachers = await pool.query('SELECT * FROM shelp_teacher');
        res.status(200).send(teachers.rows);
    }

    public async getTeacherById(req, res) {
        const teacherId = req.params.id;
        const teacher = await pool.query('SELECT * FROM shelp_teacher WHERE id=$1', [teacherId]);
        res.status(200).send(teacher.rows[0]);
    }

}