'use strict';

const path = require('path'),
    
    Args = require('vamtiger-argv'),
    Vamtiger = require('vamtiger-cli'),
    
    Task = require('./Task'),

    args = new Args(),
    vamtiger = new Vamtiger();

class VamtigerTask {
    constructor() {
        this.taskName = this._taskName;
        this.projectPath = this._projectPath;
    }

    main() {
        const parameters = {
            taskName: this.taskName,
            projectPath: this.projectPath
        };

        vamtiger.run.task(parameters)
            .then(() => process.exit(0))
            .catch(this._handleError);;
    }

    get _taskName() {
        const taskName = args.get('taskName');

        return taskName;
    }

    get _projectPath() {
        const projectPath = process.cwd();

        return projectPath;
    }

    _handleError(error) {
        throw error;
    }
}

const vamtigerTask = new VamtigerTask();

vamtigerTask.main();