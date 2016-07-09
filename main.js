var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepMaintainer = require('creep.maintainer');

var MIN_HARVESTERS = 2;
var MIN_UPGRADERS = 2;
var MIN_BUILDERS = 3;

module.exports.loop = function () {
    
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Removing creep with name "' + name + '"');
        }
    }
    
    creepMaintainer.checkAndUpdate();
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
}
