import axios from '../../../DB/axios.js';

export default {
    async contactCoach(context, payload) {
        const newContact = {
            contactEmail: payload.email,
            contactMessage: payload.message,
        };
        try {
            const res = await axios.post(`requests/${payload.coachId}.jso`, newContact);
            console.log(res.data);
            context.commit('addRequest', {
                ...newContact,
                id: res.data.name,
                coachId: payload.coachId,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        let res;
        try {
            res = await axios.get(`requests/${coachId}.json?auth=${token}`);
        } catch (error) {
            throw new Error(error);
        }

        const requests = [];
        for (const key in res.data) {
            const request = {
                id: key,
                coachId: coachId,
                contactEmail: res.data[key].contactEmail,
                contactMessage: res.data[key].contactMessage,
            };
            requests.push(request);
        }
        context.commit('setRequests', requests);
    },
};
