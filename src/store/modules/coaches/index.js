import actions from './actions.js';
import mutations from './mutations';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Obiwan',
                    lastName: 'Kenobi',
                    desc: 'Old jedi knight. A General in the Clone wars.',
                    hourlyRate: 150,
                    expertise: ['lightsabre', 'force ghost', 'lightside'],
                },
                {
                    id: 'c2',
                    firstName: 'Darth',
                    lastName: 'Vader',
                    desc:
                        'A sith lord. The chosen one to bring balance to the force. Was a jedi, but was seduced to the dark side.',
                    hourlyRate: 400,
                    expertise: ['lightsabre', 'darkside', 'fear'],
                },
            ],
        };
    },
    mutations,
    actions,
    getters,
};
