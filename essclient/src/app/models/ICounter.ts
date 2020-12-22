export interface ICountryOption {
    value: string;
    label: string;
}

export const COUNTRIES = ['Česká Republika', 'Slovensko'];

export const getCountriesOptions = (): ICountryOption[] => {
    return COUNTRIES.map(c => ({
        value: c, 
        label: c,
    }));
};