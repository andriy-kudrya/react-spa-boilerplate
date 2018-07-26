import { ajax, buildUrl } from '#/utils/ajax'
import config from '#/constants/config'

import ApiService from '../api-service'

function factory(): ApiService {
    return {
        get,
        post,
    }

    function get<T>(path: string[], query?: object): Promise<T> {
        const url = buildUrl({
                api: config.api,
                segments: path,
                query,
            })

        return ajax<T>({
            url,
            method: 'GET',
        })
    }

    function post<T>(path: string[], body: any): Promise<T> {
        const url = buildUrl({
            api: config.api,
            segments: path,
        })

        return ajax<T>({
            url,
            method: 'POST',
            body,
        })
    }
}

export default factory
