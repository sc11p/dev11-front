"use strict";

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import HttpStatus from 'http-status'
import {pick} from 'lodash'
import router from '../router'
import {RESPONSE_HEADERS} from '../constants'
import common from '../common';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://localhost:3000';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // pass auth tokens with every request
        config.headers = store.getters.auth;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // intercept every response to handle tokens
        if (response.headers[RESPONSE_HEADERS.ACCESS_TOKEN]) {
            handleSessionWithCookie(response);
        }
        return response;
    },
    function (error) {
        handleErrorResponse(error);
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin);

export default Plugin;

function handleSessionWithCookie(response) {
    // commit the relevant headers to the store, calling mutation 'auth'
    const authHeaders = pick(response.headers, RESPONSE_HEADERS.ARRAY);
    store.commit('setAuth', authHeaders);

    let sessionCookie = common.getSessionCookie();

    if (sessionCookie) {
        try {
            let session = JSON.parse(sessionCookie);
            session['tokens'] = authHeaders;
            common.setSessionCookie(session);
        } catch (e) {
            console.log('unable to parse session');
        }
    }
}

function handleErrorResponse(error) {
    // defines a callback after any FAILED request

    // handles every case when the server responds with a 403 / unauthorized, and will redirect to the login component
    if (router.currentRoute.name !== 'login' && error.response.status === HttpStatus.UNAUTHORIZED) {
        store.commit('setUser', null);
        router.push('login').catch(err => console.log('error: ' + err));
    }

    // handles every case when the server responds with a 422 / unprocessable entity, and will update session cookie
    if (router.currentRoute.name !== 'login' && error.response.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        handleSessionWithCookie(error.response);
    }
}
