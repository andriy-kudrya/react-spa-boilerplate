interface ApiService {
    get<T>(path: string[], query?: object): Promise<T>
    post<T>(path: string[], body: any): Promise<T>
}

export default ApiService
