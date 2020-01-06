'use strict';

const ROUTES = {
    golfers: 'v1/golfers',
    outings: 'v1/outings',
    auth: {
        signIn: 'v1/auth/sign_in',
        signOut: 'v1/auth/sign_out'
    }
};

function build(route) {
    return `/api/${route}`;
}

export default {
    golfers: build(ROUTES.golfers),
    outings: build(ROUTES.outings),
    signIn: build(ROUTES.auth.signIn),
    signOut: build(ROUTES.auth.signOut)
}
