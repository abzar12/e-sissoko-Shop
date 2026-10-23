import style from "./dashome.module.css"
// import Chart from 'react-apexcharts';
// import { ChartBarOption } from "./DashhomeData/chartBar.jsx";
import { ChartBarOptionFn } from "./DashhomeData/chartBar.jsx";
import { ChartLineOptionFn } from "./DashhomeData/chartBar.jsx";
import { ChartPieOptionFn } from "./DashhomeData/chartBar.jsx";
import { CharBarYearOptionFn } from "./DashhomeData/chartBar.jsx";
import { ChartPieMonthsOption } from "./DashhomeData/chartBar.jsx";

import RecentOrderedTable from "./DashhomeData/dashomeTable.jsx";
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch.jsx";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
function ChartLoading() {
    return (
        <div
            role="status"
            aria-label="Loading chart"
            className="flex h-full min-h-48 w-full animate-pulse flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
            <div className="mb-5 flex items-center justify-between">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-100" />
            </div>

            <div className="flex flex-1 items-end gap-3 border-b border-l border-slate-200 px-3 pb-2">
                {[40, 65, 50, 85, 60, 100, 72].map((height, index) => (
                    <div
                        key={index}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-200 to-indigo-400"
                        style={{ height: `${height}%` }}
                    />
                ))}
            </div>

            <span className="sr-only">Loading chart...</span>
        </div>
    )
}
const LazyChart = lazy(() => import("react-apexcharts"))
function ChartWhenVisible(props) {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "200px" }
        )

        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            {isVisible && (
                <Suspense fallback={<ChartLoading />}>
                    <LazyChart {...props} /> 
                </Suspense>
            )}
        </div>
    )
}
function DashHome() {
    // getting all orders 
    const [year, SetYear] = useState("2026")
    const { data: YearsOrdersSales, error: YearsOrdersSalesError, isLoading: YearsOrdersSalesLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getYearly?year=${year}`)
    // getting week's Daily orders 
    const { data: DailyOrdersData, error: DailyOrdersError, isLoading: DailyOrdersLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getDaily/`)
    console.log("DAily ord ***", DailyOrdersData)
    const ChartBarOption = ChartBarOptionFn(DailyOrdersData?.Orders )
    const ChartLineOption = ChartLineOptionFn(DailyOrdersData?.Items ?? [])
    const CharBarYearOption = CharBarYearOptionFn(YearsOrdersSales?.orders ?? [])
    const CharPieOption = ChartPieOptionFn()
    //  Total Amount of week
    console.log(DailyOrdersData)
    const Amount_Orders = useMemo(() => {
        if (!DailyOrdersData?.Orders) return 0
        const Amount = DailyOrdersData.Orders.reduce((acc, currentSum) => {
            return acc + Number(currentSum.Total_Amount || 0)
        }, 0)
        return Amount ? Amount : 0
    }, [DailyOrdersData])
    //  Daily Amount
    const Daily_Amount = useMemo(() => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let today = days[new Date().getDay()];
        console.log(today)
        return (DailyOrdersData?.Orders ?? [])
            ?.filter((item) => item.day === today)
            .reduce((acc, item) => {
                return acc + Number(item.Total_Amount || 0)
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
                                    <ChartWhenVisible
                                       className={style.Chart1}
                                       options={ChartBarOption.option}
                                       series={ChartBarOption.series}
                                       type="bar"
                                       height="100%"
                                    />
                                    // <Chart className={style.Chart1} options={ChartBarOption.option} series={ChartBarOption.series} type="bar" height="100%" />
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
                                    <ChartWhenVisible
                                       className={style.Chart1}
                                       options={ChartLineOption.option}
                                       series={ChartLineOption.series}
                                       type="area"
                                       height="100%"
                                    />
                                    // <Chart options={ChartLineOption.option} type="area" series={ChartLineOption.series} height="100%" />
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
                                    <ChartWhenVisible
                                       className={style.Chart1}
                                       options={CharPieOption.options}
                                       series={CharPieOption.series}
                                       type="donut"
                                       height="100%"
                                    />
                                    // <Chart options={CharPieOption.options} series={CharPieOption.series} type="donut" height="100%" />
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
                            YearsOrdersSalesLoading ? (
                                <p className={style.p}>Loading sales...</p>
                            ) : !YearsOrdersSales?.orders?.length ? (
                                <p className={style.p}>No Sales In this Year</p>
                            ) : (
                                <ChartWhenVisible
                                   options={CharBarYearOption.option}
                                   series={CharBarYearOption.series}
                                   type="line"
                                   height="100%"
                                />
                            )}
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
                        <ChartWhenVisible
                           className={style.Chart1}
                           options={ChartPieMonthsOption.options}
                           series={ChartPieMonthsOption.series}
                           type="donut"
                           height="100%"
                        />
                        {/* <Chart options={ChartPieMonthsOption.options} series={ChartPieMonthsOption.series} type="donut" height="100%" /> */}
                    </div>
                </div>
            </div>

        </>
    )
}
export default DashHome