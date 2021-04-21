import axois from '../../../DB/axios.js';

export default {
    async addCoach(context, data) {
        const userId = context.rootGetters.userId;

        const newCoach = {
            firstName: data.first,
            lastName: data.last,
            desc: data.desc,
            hourlyRate: data.rate,
            expertise: data.expertise,
        };
        try {
            await axois.put(`coaches/${userId}.json`, {
                ...newCoach,
            });
        } catch (error) {
            console.log(error);
        }
        context.commit('addCoach', {
            ...newCoach,
            id: userId,
        });
    },
    async loadCoaches(context, payload) {
        // check if local data is up to date
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const coaches = [];
        try {
            const res = await axois.get('coaches.json');
            const data = res.data;
            console.log(res.data);
            for (const key in data) {
                const coach = {
                    id: key,
                    firstName: data[key].firstName,
                    lastName: data[key].lastName,
                    desc: data[key].desc,
                    hourlyRate: data[key].hourlyRate,
                    expertise: data[key].expertise,
                };
                coaches.push(coach);
            }

            context.commit('setCoaches', coaches);
            context.commit('setFetchTime');
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
