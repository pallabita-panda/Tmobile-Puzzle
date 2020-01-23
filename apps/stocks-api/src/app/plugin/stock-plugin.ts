import axios from 'axios';
import { environment } from './../../environments/environment'
export const stockplugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: function (server, options) {
        server.method('stockRequest', stockRequest, {
            cache: {
                cache: 'stock_cache',
                expiresIn: 20 * 10000,
                generateTimeout: 10000,
                getDecoratedValue: true
            }
        });
        server.route({
            method: 'GET',
            path: '/apiPath/stocks/{symbol}/{period}',
            handler: async function (request, h) {
                const symbol = request.params.symbol;
                const period = request.params.period;
                const { value, cached } = await server.methods.stockRequest(symbol, period);
                const lastModified = cached ? new Date(cached.stored) : new Date();
                if(cached){
                    console.log('cache call');
                }
                return h.response(value)
                    .header('Last-modified', lastModified.toUTCString());
                    
            }
        });
    }
}

function stockRequest(symbol, period) {
    const apiURL = environment.apiURL;
    const apiKey = environment.apiKey;
    const requestUrl = `${apiURL}/beta/stock/${symbol}/chart/${period}?token=${apiKey}`;
    try {
        return axios.get(requestUrl).then(response => {
            console.log('Api Call');
            return response.data;
        })
    } catch (error) {
        console.log('error' + error);
        return Promise.reject(error);
    }
}
