interface Header {
    header: string,
    value: string,
}

interface AjaxOptions {
    method: string,
    url: string,
    headers?: Header[]
    body?: string | FormData
}

interface Ajax {
    <T>(options: AjaxOptions): Promise<T>
}

function ajax<T>(options: AjaxOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(options.method, options.url)

        xhr.responseType = 'text'
        xhr.addEventListener('load', handleLoad)
        xhr.addEventListener('error', handleError)

        if (options.headers)
            options.headers.forEach(_ => xhr.setRequestHeader(_.header, _.value))

        if (options.body) {
            xhr.send(options.body)
        }
        else {
            xhr.send()
        }

        function handleLoad(this: XMLHttpRequest) {
            const status = this.status

            if (status < 200 || status >= 300) {
                reject({
                    status,
                    statusText: this.statusText,
                })
                return
            }

            try {
                const object: T = this.response ? JSON.parse(this.response) : undefined
                resolve(object)
            }
            catch (err) {
                reject(err)
            }
        }

        function handleError() {
            // error argument is event that is pretty unusable
            reject('Network error')
        }
    })
}

function buildUrl(params: { api: string, segments: string[], query?: object }): string {
    const path = '/' + params.segments.map(encodeURIComponent).join('/')
        , api = params.api.replace(/[/]*$/g, '')
        , url = api + path
        , query = params.query as any

    if (query == null)
        return url

    const queryStr = Object.keys(query)
        .reduce(
            (acc, key) => {
                const value = query[key]
                    , pairs = Array.isArray(value)
                        ? value.map(_ => makeQueryPair(key, _, true))
                        : [makeQueryPair(key, value, false)]

                return acc.concat(pairs)
            },
            [] as string[]
        )
        .join('&')

    return `${url}?${queryStr}`

}

function makeQueryPair(key: string, value: any, isArray: boolean): string {
    return encodeURIComponent(key)
        + (isArray ? '[]' : '')
        + '='
        + encodeURIComponent(value == null ? 'null' : value)
}

export { ajax, Ajax, buildUrl }
