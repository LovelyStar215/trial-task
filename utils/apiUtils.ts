import axios, { AxiosInstance } from 'axios';
import qs from 'query-string';

const buildQueryString = (queryObj: any) => (queryObj ? '?' + qs.stringify(queryObj) : '');
const axiosApi: AxiosInstance = axios.create({
    headers: {}
});
const cache: any = {};
interface ApiParams {
    query?: any;
    payload?: any;
    options?: any;
    noCache?: boolean;
    noAuth?: boolean;
    [key: string]: any;
}
const catchError = (err: any) => {
    console.error('catchError', err, err?.response);
    return { error: { message: typeof err === 'object' ? err?.message : err }, status: err?.response?.status };
};

export const apiGet = async (path: string, params?: ApiParams) => {
    const queryStr = buildQueryString(params?.query);
    let url = `${path}${queryStr}`;
    url = url.startsWith('@') ? url.replace(/@/, "/") : url;

    if (cache[url] && params?.noCache !== true) {
        return cache[url].content;
    }
    try {
        const { data, status } = await axiosApi({
            url: path.startsWith('http') ? path : url,
            method: 'GET',
            headers: path.startsWith('http') ? {} : "",
            ...params?.options
        });
        cache[url] = { content: { data, status } }; // cache output
        return { data, status };
    } catch (err: any) {
        const { error, status } = catchError(err);
        if (status === 401) {
            return { error: new Error('Unauthorized'), status };
        }
        return { error, status };
    }
};