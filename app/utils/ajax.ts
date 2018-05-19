interface AjaxOptions {
    method: string,
    url: string,
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

        xhr.send()

        function handleLoad(this: XMLHttpRequest) {
            try {
                const object: T = JSON.parse(this.response)
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

export { ajax, Ajax }
