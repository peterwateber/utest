const db = require('../../db/connect');

exports.post = async (req, res) => {
    const { student } = req.body;
    const studentEmail =
        typeof student === 'object' ? student.join(' ') : student;
    await db({
        async: true,
        queryStr: `
            UPDATE students s
            SET isSuspended = 1
            WHERE s.email = ?
        `,
        queryData: [studentEmail],
        success() {
            if (typeof student !== 'object') {
                res.status(204).send();
            } else {
                res.status(206).send({
                    message:
                        'Multiple student suspension not allowed. Please check your parameter'
                });
            }
        }
    });
};
