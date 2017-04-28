'use strict';

const path = require('path'),
    
    gulp = require('gulp'),
    Args = require('vamtiger-argv'),
    Vamtiger = require('vamtiger-cli'),
    vamtiger = new Vamtiger(),
    
    args = new Args();

class Task {
    static run() {
        const params = {
            taskName: this.taskName,
            projectPath: process.cwd()
        };
        
        vamtiger.run.task(params)
            .then(() => process.exit(0))
            .catch(this.handleError);
    }

    static handleError(error) {
        throw error;
    }

    static get taskName() {
        const taskName = args.get('taskName');

        return taskName;
    }
}

module.exports = Task;