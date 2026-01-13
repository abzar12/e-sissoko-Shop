import style from "./dashome.module.css"
import Chart from 'react-apexcharts';
import { ChartBarOption } from "./DashhomeData/chartBar.js";
import { ChartLineOption } from "./DashhomeData/chartBar.js";
import { ChartPieOption } from "./DashhomeData/chartBar.js";
import RecentOrderedTable from "./DashhomeData/dashomeTable.jsx";
function DashHome() {

    return (
        <>
            <div className={style.container}>
                <div className={style.cards}>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Total Order</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chart}>
                            <Chart className={style.Chart1} options={ChartBarOption.option} series={ChartBarOption.series} type="bar" height="100%" />
                            <div className={style.chart1}></div>
                            <div className={style.chart2}></div>
                            <div className={style.chart3}></div>
                            <div className={style.chart4}></div>
                            <div className={style.chart5}></div>
                            <div className={style.chart6}></div>
                            <div className={style.chart7}></div>
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Daily Sales</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chart}>
                            <Chart options={ChartLineOption.option} series={ChartLineOption.series} height="100%" />
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Weekly Sales</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chart} >
                            <Chart options={ChartPieOption.options} series={ChartPieOption.series} type="donut" height="100%" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.OrderTable}>
                <h1 >Recent Orders</h1>
                <RecentOrderedTable />
            </div>
        </>
    )
}
export default DashHome