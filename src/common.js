'use strict';

import VueCookie from 'vue-cookie'

const SESSION_COOKIE_NAME = 'session';

function getSessionCookie() {
    return VueCookie.get(SESSION_COOKIE_NAME);
}

function setSessionCookie(contents) {
    VueCookie.set(SESSION_COOKIE_NAME, JSON.stringify(contents), {expires: '14D'});
}

function deleteSessionCookie() {
    VueCookie.delete(SESSION_COOKIE_NAME);
}

export default {
    getSessionCookie: getSessionCookie,
    setSessionCookie: setSessionCookie,
    deleteSessionCookie: deleteSessionCookie
}
