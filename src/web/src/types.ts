export type APIResponse = {
    forecast: [number] | [number, number];
    meta: {
        country: string;
        name: string;
        region: string;
        lon: number;
        lat: number;
        localtime: string;
    }
}
