const router = require("express").Router();
const Class = require("../model/class.js");
const Student = require("../model/student.js");

router.post("/", async (req, res) => {
    try {
        const class_array = req.body.class;
        const studentCount = req.body.studentCount;
        await Class.create({ class: class_array, studentCount: studentCount }, (err, data) => {
            res.status(201).json({ id: data._id });
        });
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

router.post("/:myClassId/students", async (req, res) => {
    try {
        const name = req.body.name;
        const classId = req.params.myClassId || req.body.classId;
        await Student.create({ name: name, classId: classId }, (err, data) => {
            res.status(201).json({ studentId: data._id });
        })
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const classes = await Class.find({}, { data: 0, __v: 0 });
        res.status(200).json({
            classes: classes
        })
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})
/*
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find({}, { data: 0, __v: 0 });
        res.status(200).json({
            students
        })
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})
*/

router.get("/:myClassId", async (req, res) => {
    try {
        const response = await Class.findOne({ _id: req.params.myClassId }, { data: 0, __v: 0 });
        res.status(200).json({
            id: response._id,
            class: response.class,
            studentCount: response.studentCount
        })
    } catch (err) {
        res.status(404).json({ error: "There is no class at that id" })
    }
})

router.get("/:myClassId/students", async (req, res) => {
    try {
        const classId = (req.params.myClassId)
        let response = await Student.find({ classId: classId }, { data: 0, __v: 0 });
        if (response.length == 0) return res.status(404).json({ error: "There are no students at this class" });
        response = response.map(obj => {return { 
            name: obj.name,
            studentId: obj._id,
            classId: obj.classId
        }})
        res.status(200).json({ ...response })
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

router.get("/:myClassId/students/:studentId", async (req, res) => {
    try {
        const classId = (req.params.myClassId)
        const studentId = (req.params.studentId)
        let response = await Student.findOne({ classId: classId, _id: studentId }, { data: 0, __v: 0 });
        if (!response) return res.status(404).json({ error: "There are no students of that id" });
        const response_obj = { 
            name: response.name,
            studentId: response._id,
            classId: response.classId
        }
        res.status(200).json(response_obj)
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

router.put("/:myClassId/students/:studentId", async (req, res) => {
    try {
        const classId = (req.params.myClassId)
        const studentId = (req.params.studentId)
        const name = req.body.name;
        let response = await Student.updateOne({ classId: classId, _id: studentId }, {name : name});
        if (response.matchedCount == 0) return res.status(404).json({ error: "There are no students of that id" });
        const response_obj = { 
            name: response.name,
            studentId: response._id,
            classId: response.classId
        }
        res.status(200).json(response_obj)
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

router.delete("/:myClassId", async (req, res) => {
    try {
        const classId = (req.params.myClassId)
        let response = await Class.deleteOne({ _id: classId});
        if (response.deletedCount == 0) return res.status(404).json({ error: "There is no task at that id" });
        res.status(204).json()
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

router.delete("/:myClassId/students/:studentId", async (req, res) => {
    try {
        const classId = (req.params.myClassId);
        const studentId = (req.params.studentId);
        let response = await Student.deleteOne({ _id: studentId, classId: classId});
        if (response.deletedCount == 0) return res.status(404).json({ error: "There is no task at that id" });
        res.status(204).json()
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
})

module.exports = router;
