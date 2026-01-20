import style from "./dashome.module.css"
import Chart from 'react-apexcharts';
// import { ChartBarOption } from "./DashhomeData/chartBar.jsx";
import { ChartBarOptionFn } from "./DashhomeData/chartBar.jsx";
import { ChartLineOptionFn } from "./DashhomeData/chartBar.jsx";
import { ChartPieOptionFn } from "./DashhomeData/chartBar.jsx";
import { CharBarYearOptionFn } from "./DashhomeData/chartBar.jsx";
import { ChartPieMonthsOption } from "./DashhomeData/chartBar.jsx";

import RecentOrderedTable from "./DashhomeData/dashomeTable.jsx";
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch.jsx";
import { useMemo, useState } from "react";

function DashHome() {
    // getting all orders 
    const [year, SetYear] = useState("2026")
    const { data: YearsOrdersSales, error: YearsOrdersSalesError, isLoading: YearsOrdersSalesLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getYearly?year=${year}`)
    // getting week's Daily orders 
    const { data: DailyOrdersData, error: DailyOrdersError, isLoading: DailyOrdersLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getDaily/`)
    const ChartBarOption = ChartBarOptionFn(DailyOrdersData.Orders)
    const ChartLineOption = ChartLineOptionFn(DailyOrdersData.Items)
    const CharBarYearOption = CharBarYearOptionFn(YearsOrdersSales.orders)
    const CharPieOption = ChartPieOptionFn()
    //  Total Amount of week
    const Amount_Orders = useMemo(() => {
        if (!DailyOrdersData?.Orders) return 0
        const Amount = DailyOrdersData.Orders.reduce((acc, currentSum) => {
            return acc + Number(currentSum.Total_Amount || 0)
        }, 0)
        return Amount ? Amount : 0
    }, [DailyOrdersData])
    //  Daily Amount
    const Daily_Amount = useMemo(() => {
        let today = new Date().getDate()
        return DailyOrdersData.Orders
            ?.filter((item) => item.date === today)
            .reduce((acc, item) => {
                return acc + Number(item.Total_Amount)
            }, 0)
    }, [DailyOrdersData])
    return (
        <>
            <div className={style.container}>
                <div className={style.cards}>
                    {/* Weekly Cart */}
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Total Order</h1>
                            <p className={style.value}><span className={style.cardSpan}>₵</span>{Amount_Orders}</p>
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
                    {/* Daily Cart */}
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Daily Sales</h1>
                            <p className={style.value}><span className={style.cardSpan}>₵</span>{Daily_Amount} </p>
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
                            <p className={style.value}><span className={style.cardSpan}>₵</span> 250 </p>
                        </div>
                        <div className={style.chart} >
                            {
                                CharPieOption.series?.length > 0 && (
                                    <Chart options={CharPieOption.options} series={CharPieOption.series} type="donut" height="100%" />
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
                        <select className={style.filter} onChange={(e) => SetYear(e.target.value)}>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <div className={style.Curve}>
                        {
                            YearsOrdersSales?.orders?.length == 0  ?
                                <p className={style.p}>No Sales In this Year</p>
                                :
                                <Chart options={CharBarYearOption.option} series={CharBarYearOption.series} type="line" height="100%" />
                        }
                    </div>
                </div>
                {/* Months orders */}
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