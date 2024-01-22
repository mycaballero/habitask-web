'use strict'

const HABITASK_API_BASE_URL = import.meta.env.VITE_HABITASK_API_URL
const HABITASK_API_URL = `${HABITASK_API_BASE_URL}/api`

export const FACEBOOK_REDIRECT_URL = `${HABITASK_API_URL}/auth/facebook/redirect`
export const LOGIN_URL = `${HABITASK_API_URL}/auth/login`
export const LOGOUT_URL = `${HABITASK_API_URL}/logout`
export const REGISTER_URL = `${HABITASK_API_URL}/auth/register`
export const AUTH_CALLBACK_URL = `${HABITASK_API_URL}/auth`
export const TASKS_URL = `${HABITASK_API_URL}/tasks`
export const USERS_URL = `${HABITASK_API_URL}/users`