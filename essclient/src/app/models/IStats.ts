import { IPrice } from "./IPrice";

export interface IStats {
    profits: IStatsProfit[];
}

export interface IStatsProfit
{
    yearNumber: number;
    monthNumber: number;
    monthName: string;
    profitTotal: IPrice;
    salesCount: number;
    usersCount: number;
}