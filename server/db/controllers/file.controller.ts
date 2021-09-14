import {pool} from "../db";

export class FileController {

    public async fetchFiles(req, res) {
        try {
            const files = await pool.query();
        } catch(e) {
            console.log(e);
            res.status(500).send({message: "Can not get files"})
        }
    }

    public async downloadFile(req, res ) {
        try {
            console.log('alalla');
        } catch(e) {
            console.log(e);
            res.status(500).send({message: "Download error"});
        }
    }

}