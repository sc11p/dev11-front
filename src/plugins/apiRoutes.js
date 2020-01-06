'use strict';

const ROUTES = {
    acts: 'v1/acts',
    auth: {
        signIn: 'v1/auth/sign_in',
        signOut: 'v1/auth/sign_out'
    }
};

function build(route) {
    return `/api/${route}`;
}

export default {
    acts: build(ROUTES.acts),
    signIn: build(ROUTES.auth.signIn),
    signOut: build(ROUTES.auth.signOut)
}
