const Task = require('../model/Task')

exports.createTask = async (req, res) => {
    
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.send(task)
    } catch (err) {
        res.send(err)
    }
}

exports.deleteTask = async (req, res) => {
    res.send('Yo I work')
}

exports.getTaskById = async (req, res) => {
    const _id = req.params.id

    try {       
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
}

//limit and skip are needed for pagination
//get /tasks?limit=10&skip=
//GET /tasks?sortBy=

exports.getAllTasks = async (req, res) => {
    const match = {}
    const sort = {}
    
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})   
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
      } catch (err) {
        res.status(500).send()
      }
}