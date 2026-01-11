import style from "./dashome.module.css"
import Chart from 'react-apexcharts';
function DashHome() {
    const ChartOption = {
        chart: {
            type: "bar",
            foreColor: '#373d3f',
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: "10px"
            },
            zoom: {
                enabled: false
            }
        },
        
        yaxis: {
            show: false
        },

        grid: {
            show: false
        },

        legend: {
            show: false
        },

        tooltip: {
            enabled: false
        },

        dataLabels: {
            enabled: false
        },
        xaxis: {
            labels: {
                show: false // Hides the x-axis labels (category names/values)
            },
            axisTicks: {
                show: false // Hides the small tick marks
            },
            axisBorder: {
                show: false // Hides the horizontal axis line/bar
            }
        }
    }
    const series = [
        {
            name: "Sale",
            data: [60, 70, 50, 100, 80, 10, 100]

        }
    ]
    return (
        <>
            <div className={style.container}>
                <div className={style.cards}>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Total Order</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chartBar}>
                            <Chart options={ChartOption} series={series} type="bar" height={110} />
                            <div className={style.Chart1}></div>
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Daily Sales</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chart}>

                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.textContainer}>
                            <h1>Weekly Sales</h1>
                            <p className={style.value}><span className={style.cardSpan}>$</span> 250 </p>
                        </div>
                        <div className={style.chart}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashHome