import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '@cuid/entities';
import axios from 'axios';
import Constants from '../../config/constants';

async function fetchRatesData(url: string) {
    let ratesData: string;
    try {
        ratesData = (await axios.get(url)).data;
    } catch (error) {
        console.error(new Error(`Couldn't reach ${URL} to fetch rates data.`));
    }

    return ratesData;
}

function parseRatesData(ratesData: string) {
    const regex = /(?<country>.+)[|](?<currncy>.+)[|](?<amount>.+)[|](?<code>.+)[|](?<rate>.+)/gm;
    const rates = [];

    [...ratesData.matchAll(regex)].forEach((match) => {
        const parsedRate = { ...match.groups };
        const rate = {
            ...parsedRate,
            amount: parseInt(parsedRate.amount, 10),
            rate: parseFloat(parsedRate.rate),
        };
        rates.push(rate);
    });

    // We have to remove the first result as it doesn't contain rates data, but information about order of rate attributes
    rates.shift();
    return rates;
}

@Injectable()
export class ExchangeRateService {
    async getExchangeRates() {
        let rates: ExchangeRate[] = [];

        const ratesData: string = await fetchRatesData(Constants.RATES_URL);
        rates = parseRatesData(ratesData);

        return rates;
    }
}
