import { data } from "react-router-dom"
import { intersection } from "zod"

export const ChartBarOption = {
    option: {
        chart: {
            type: "bar",
            foreColor: '#373d3f',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                columnWidth: "51%",
                backgroundBarRadius: 6,
            },
        },
        yaxis: {
            show: false,
        },

        grid: {
            show: false
        },

        legend: {
            show: false
        },

        tooltip: {
            enabled: true
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
            },
            categories: ['Mounday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', "Sanday"],
        },
        colors: ["#3b82f6"]
    },
    series: [
        {
            name: "sale",
            data: [30, 70, 50, 70, 80, 90, 100]

        }
    ]
}


export const ChartLineOption = {
    option: {
        chart: {
            type: "area",
            toolbar: {
                show: false
            },
            // height: 200,
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
            },
        },

        yaxis: {
            show: false,
            // max: 300, 
        },

        grid: {
            show: false
        },

        legend: {
            show: false
        },

        tooltip: {
            enabled: true
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
            },
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', "Sanday"],
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
    },

    series: [{
        name: "Sale",
        data: [30, 40, 55, 80, 100, 125]
    }]
}

export const ChartPieOption = {
    series: [45, 55, 13, 33], // values for each slice

    options: {
        chart: {
            type: "donut",
        },
        labels: ['Sumsung', 'Protector', 'Cable', 'Iphone'],
        legend: {
            show: false,
            position: 'bottom', // op,tional: bottom, left, right, top
        },
        dataLabels: {
            enabled: false, // show values on slices
        },
         stroke: {
            width: 0
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: "100%" },
                    legend: { show: false}
                }
            }
        ], 
        plotOptions: {
            pie: {
                donut: {
                    size: "80%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total",
                            fontSize: "14px"
                        }
                    }
                }
            }
        },
        tooltip: {
            y: {
                formatter: (val) => `${val}%`
            }
        },
          states: {
            hover: {
                filter: {
                    type: "lighten",
                    value: 0.15
                }
            }
        },
    }
}
export const CharBarYearOption = {
    option: {
        chart: {
            type: "line",
        },
        colors: ['#3b82f6', '#0ea5e9'],
        stroke: {
            curve: "smooth",
            width: [3, 0]
        },
        plotOptions: {
            bar: {
                // horizontal: false,
                borderRadius: 6,
                columnWidth: "60%",
            },
        },
        marked: {
            size: 4
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "July", "Aug", "Spet", "Oct", "Nov", "Dec"],
        },
        yaxis: [
            {
                title: { Text: "Amouts" }
            },
            {
                opposite: true,
                title: { Text: "Products" }
            }
        ],
        tooltip: {
            share: true,
            intersection: false
        },
        grid: {
            strokeDashArray: 4,
        }

    },


    series: [
        {
            type: "line",
            name: "Amount",
            data: [500, 200, 500, 400, 600, 700, 800, 900, 700, 700, 800, 1000],
        },
        {
            type: "bar",
            name: "Products",
            data: [200, 200, 300, 300, 200, 300, 300, 400, 400, 300, 400, 500],
        }
    ],
}

export const ChartPieMonthsOption = {
     series : [45, 55, 13, 33],

    options : {
        chart: {
            type: "pie",
        },

        labels: ["Apple", "Mango", "Orange", "Watermelon"],

        colors: ["#3b82f6", "#22c55e", "#f97316", "#ef4444"],

        legend: {
            position: "bottom",
            fontSize: "14px"
        },

        dataLabels: {
            enabled: false
        },

        stroke: {
            width: 0
        },

        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total",
                            fontSize: "14px"
                        }
                    }
                }
            }
        },

        states: {
            hover: {
                filter: {
                    type: "lighten",
                    value: 0.15
                }
            }
        },

        tooltip: {
            y: {
                formatter: (val) => `${val}%`
            }
        },

        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: "100%" },
                    legend: { position: "bottom" }
                }
            }
        ]
    }
}