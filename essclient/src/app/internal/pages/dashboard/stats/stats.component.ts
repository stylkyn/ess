import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/API/stats.service';
import { IStatsProfit, IStats } from 'src/app/models/IStats';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
    public chartType = 'line';
    public chartProfitColor: Array<any> = [
        {
            backgroundColor: 'rgba(105, 0, 132, .2)',
            borderColor: 'rgba(200, 99, 132, .7)',
            borderWidth: 2,
        },
    ];
    public chartSalesColor: Array<any> = [
        {
            backgroundColor: 'rgba(0, 137, 132, .2)',
            borderColor: 'rgba(0, 10, 130, .7)',
            borderWidth: 2,
        }
    ];
    public chartOptions: any = { responsive: true };
    public statsLabels;
    public profitData;
    public salesData;

    constructor (private _statsService: StatsService) { }

    ngOnInit() {
        this._statsService.fetchStats()
            .subscribe(stats =>  {
                const saleStats = stats?.profits?.map(x => x.salesCount) ?? [];
                const profitStats = stats?.profits?.map(x => x.profitTotal.czkWithVat) ?? [];
                this.salesData = [
                    {
                        data: saleStats,
                        label: 'Počet prodejů'
                    }
                ];
                this.profitData = [
                    {
                        data: profitStats,
                        label: 'Obrat společnosti v Kč'
                    },
                ];
                this.statsLabels = stats?.profits?.map(x => x.monthName) ?? [];
        });
    }
}
