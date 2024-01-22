import {createFetch} from '@vueuse/core'

const handleErrors = async (status, store, router) => {
    switch (status) {
        case 401:
            store.logout()
            await router.push({name: 'login'})
            break;
    }
}

export default {
    install: (app, params) => {
        const useDefaultCreateFetch = createFetch({
            baseUrl: params.authStore.tk,
            options: {
                async beforeFetch({options}) {
                    options.headers.Authorization = `Bearer ${params.authStore.tk}`
                    options.headers.Accept = 'application/json'
                    return {options}
                },
                async onFetchError(ctx) {
                    await handleErrors(ctx.response?.status, params.authStore, params.router)
                    return ctx
                }
            },
            fetchOptions: {
                mode: 'cors',
            },
        })
        app.provide("useFetchDefault", useDefaultCreateFetch);
    }
};