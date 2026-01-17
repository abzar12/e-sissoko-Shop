import style from "./dashome.module.css"
import Chart from 'react-apexcharts';
import { ChartBarOption } from "./DashhomeData/chartBar.js";
import { ChartLineOption } from "./DashhomeData/chartBar.js";
import { ChartPieOption } from "./DashhomeData/chartBar.js";
import { CharBarYearOption } from "./DashhomeData/chartBar.js";
import { ChartPieMonthsOption } from "./DashhomeData/chartBar.js";

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
                            {
                                ChartBarOption.series?.length > 0 && (
                                    <Chart className={style.Chart1} options={ChartBarOption.option} series={ChartBarOption.series} type="bar" height="100%" />
                                )
                            }
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
                            {
                                ChartLineOption.series?.length > 0 && (
                                    <Chart options={ChartLineOption.option} series={ChartLineOption.series} height="100%" />
                                )
                            }
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Weekly Sales</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chart} >
                            {
                                ChartPieOption.series?.length > 0 && (
                                    <Chart options={ChartPieOption.options} series={ChartPieOption.series} type="donut" height="100%" />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------------------Recent Ordered Table */}
            <div >
                <RecentOrderedTable />
            </div>
            {/* ---------------------Years Curve  */}
            <div className={style.GlobalCurves}>
                <div className={style.YearsCurve}>
                    <div className={style.filterBox}>
                        <div className="">
                            <h1>Revenue</h1>
                        </div>
                        <select className={style.filter}>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <div className={style.Curve}>
                        <Chart options={CharBarYearOption.option} series={CharBarYearOption.series} type="line" height="100%" />
                    </div>
                </div>
                <div className={style.MounthOrder}>
                    <div className={style.filterBox}>
                        <div className="">
                            <h1>Mountly Sales Total</h1>
                        </div>
                        <select className={style.filter}>
                            <option value="jan">Jan</option>
                            <option value="feb">Feb</option>
                            <option value="Mar">Mar</option>
                            <option value="Apr">Apr</option>
                            <option value="May">May</option>
                            <option value="Jui">July</option>
                            <option value="Ogu">Aug</option>
                            <option value="Sep">Sep</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                        </select>
                    </div>
                    <div className={style.Curve}>
                        <Chart options={ChartPieMonthsOption.options} series={ChartPieMonthsOption.series} type="donut" height="100%" />
                    </div>
                </div>
            </div>

        </>
    )
}
export default DashHome