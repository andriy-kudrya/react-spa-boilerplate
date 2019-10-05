import config from '#/constants/config'
import { ajax, buildUrl, Header, AjaxResponse } from '#/utils/ajax'
import { assign } from '#/utils/object'

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

        return jsonAjax({
            url,
            method: 'GET',
        })
    }

    function post<T>(path: string[], body: any): Promise<T> {
        const url = buildUrl({
            api: config.api,
            segments: path,
        })

        return jsonAjax({
            url,
            method: 'POST',
            body,
        })
    }

    interface JsonAjaxOptions {
        method: string
        url: string
        headers?: Header[]
        body?: string | FormData
    }

    function jsonAjax(options: JsonAjaxOptions, parser = jsonParser) {
        const headers = (options.headers || []).concat()
        if (typeof options.body === 'string')
            headers.push({
                header: 'content-type',
                value: 'application/json; charset=utf-8',
            })

        const responseType: 'text' = 'text'
            , ajaxOptions = assign(
                { responseType, headers },
                options
            )

        return ajax(ajaxOptions).then(parser)
    }

    function jsonParser(response: AjaxResponse): any {
        return response.response ? JSON.parse(response.response) : undefined
    }
}

export default factory
