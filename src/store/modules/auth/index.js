import axios from '../../../DB/axios.js';

let expireTimer;

export default {
    state() {
        return {
            token: null,
            userId: null,
            hasAutoLogout: false,
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return !!state.token;
        },
        didAutoLogout(state) {
            return state.hasAutoLogout;
        },
    },
    actions: {
        async auth(context, payload) {
            const mode = payload.mode;
            let url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIE3vRcKQvOaxgCB-CXJelWmNyfBOS2yg';
            if (mode === 'signup') {
                url =
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIE3vRcKQvOaxgCB-CXJelWmNyfBOS2yg';
            }
            try {
                const res = await axios.post(url, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                console.log(res);

                // 3600 * 1000 = millseconds
                const expiresIn = +res.data.expiresIn * 1000;
                //const expiresIn = 5000;
                const expirationDate = new Date().getTime() + expiresIn;
                //setting localstorage of login for persisent logged in
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('tokenExpire', expirationDate);

                // set a timer to logout
                expireTimer = setTimeout(function() {
                    context.dispatch('autoLogout');
                }, expiresIn);
                // commit to the vuex data
                context.commit('setUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                });
                //console.log(context.getters.token);
            } catch (error) {
                throw new Error(getErrorMsg(error));
            }
        },
        checkLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const expirationDate = localStorage.getItem('tokenExpire');

            const expiresIn = +expirationDate - new Date().getTime();
            // the token has now expired. Need to login manually
            if (expiresIn < 0) {
                return;
            }

            expireTimer = setTimeout(function() {
                context.dispatch('autoLogout');
            }, expiresIn);

            if (token && userId) {
                context.commit('setUser', {
                    token,
                    userId,
                });
            }
        },
        autoLogout(context) {
            context.dispatch('logout');
            context.commit('setAutoLogout');
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpire');

            clearTimeout(expireTimer);

            context.commit('setUser', {
                token: null,
                userId: null,
            });
        },
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.hasAutoLogout = false;
        },
        setAutoLogout(state) {
            console.log('setAutLogout');
            state.hasAutoLogout = true;
        },
    },
};

const getErrorMsg = error => {
    console.dir(error);
    let msg = '';
    console.log(error.response.data.error.message);
    // prettier-ignore
    const errorMessages = {
        EMAIL_EXISTS: 'Email already in use, please login.',
        INVALID_PASSWORD: 'Invalid username or password.',
    };
    if (error.response) {
        if (error.response.data.error.message) {
            if (Object.keys(errorMessages).includes(error.response.data.error.messages)) {
                msg = errorMessages[error.response.data.error.messages];
            }
        } else {
            msg = error.response.status;
        }
    } else if (error.request) {
        msg = error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        msg = 'Error - ' + error.message;
    }
    return msg;
};
