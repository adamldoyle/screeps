function checkRole(role, minimum, parts) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    
    if (creeps.length < minimum) {
        console.log('Have ' + creeps.length + ' ' + role + ', need ' + minimum + ' total.');
        var digit = 0;
        for (digit = 0; ; digit++) {
            if (!Game.creeps[role + '-' + digit]) {
                break;
            }
        }
        var options = { role: role };
        if (role == 'harvester') {
            var targets = [0, 0];
            for (var idx in creeps) {
                var otherCreep = creeps[idx];
                targets[otherCreep.memory.targetNum] += 1;
            }
            options.targetNum = (targets[0] < 2 ? 0 : 1);
            console.log('Assigning to target ' + options.targetNum);
        }
        var resp = Game.spawns.Spawn1.createCreep(parts, role + '-' + digit, options);
        if (typeof(resp) == 'string') {
            
            console.log('Spawning ' + role + ' "' + resp + '"')
        }
    }
}

module.exports = {
    checkAndUpdate: function() {
        // WORK = 100, CARRY = 50, MOVE = 50
        checkRole('harvester', 5, [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]);
        checkRole('upgrader', 1, [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]);
        checkRole('builder', 3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]);
    }
};
