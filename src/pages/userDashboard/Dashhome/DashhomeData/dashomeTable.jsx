
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import useDashboardFetch from "../../../../component/Context/DashboardContext/dashboardFetch";
import style from "../dashome.module.css"
import { useState } from "react";
import { FaTrash, FaEye, FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function RecentOrderedTable() {
    const [columnFilters, SetColumnFilters] = useState([])
    const columnHelper = createColumnHelper()
    let [page, setPage] = useState(1)
    let [limit, setLimit] = useState(15)
    const { data, error, isLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getAll?page=${page}&limit=${limit}`)
    console.log("Orders ", data)
    const column = [
        columnHelper.accessor("ID", {
            header: "Order_ID"
        }),
        columnHelper.accessor("Email", {
            header: "Email"
        }),
        columnHelper.accessor("Products", {
            header: "Products",
            cell: ({ getValue }) => {
                const product = getValue()
                return (
                    <span className=" line-clamp-1  ">{product}</span>
                )
            }
        }),
        columnHelper.accessor("Date", {
            header: "Date",
            cell: ({ getValue }) => {
                const date = getValue()
                const spliteDate = date.split("T")

                return (<span className=" whitespace-nowrap ">{spliteDate[0]}</span>)
            }
        }),
        columnHelper.accessor("Payment", {
            header: "Payment"
        }),
        columnHelper.accessor("Amount", {
            header: "Amount"
        }),
        columnHelper.accessor("Status", {
            header: "Status",
            accessoryKey: "Status",
            cell: ({ getValue }) => {
                const status = getValue().toLowerCase();
                const ClassMap = {
                    paid: "bg-blue-600 px-3 py-1 rounded-full text-white text-[0.9rem] ",
                    comfirmed: "bg-blue-600 px-3 py-1 rounded-full text-white text-[0.9rem] ",
                    pending: "bg-yellow-500 px-3 py-1 rounded-full text-white text-[0.9rem]",
                    cancelled: "bg-red-500 px-3 py-1 rounded-full text-white text-[0.9rem]",
                    delivered: "bg-green-600 px-3 py-1 rounded-full text-white text-[0.9rem]",
                }
                return (
                    <span className={ClassMap[status]}>
                        {status}
                    </span>
                )
            }
        }),
        columnHelper.accessor("action", {
            header: "Action",
            cell: (<div className="flex justify-between">
                <FaEye className=" cursor-pointer hover:text-gray-400 transition duration-300" onClick={() => console.log("view")} />
                <FaTrash className="text-red-500 cursor-pointer hover:text-red-800 transition duration-300 " onClick={() => console.log("view")} />
            </div>)
        }),
    ]

    const table = useReactTable({
        data: data?.orders ?? [],
        columns: column,
        state: {
            columnFilters
        },
        onColumnFiltersChange: SetColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    console.log("table:", table)
    return (
        <>
            <div className={style.OrderContainer}>
                <div className={style.OrderHeader}>
                    <h1 className={style.OrderTitle}>Recent Orders</h1>
                    <div className={style.FilterBox}>
                        <select className={style.filter}
                            value={table.getColumn("Status").getFilterValue() ?? ""}
                            onChange={(e) =>
                                table.getColumn("Status")?.setFilterValue(e.target.value)
                            }
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="paid ">Paid</option>
                            <option value="Delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-scroll px-3">
                    <table className={style.OrderTable}>
                        <thead>
                            {
                                table.getHeaderGroups().map(headGroup => (
                                    <tr key={headGroup.id} className={style.titleBox}>
                                        {
                                            headGroup.headers.map((header) => (
                                                <th key={header.id} className={style.Title}>
                                                    {
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                    }
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className={style.Row}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className={`${style.Column} `}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className={style.footer_btn}>
                        <button onClick={() => setPage(prev => prev - 1)} disabled={page == 1} className={` ${page == 1 ? "text-gray-300" : null}`}><FaArrowAltCircleLeft /></button>
                        <span className={style.span}>{data.offset} - {data.limitPage}</span>
                        <button onClick={() => setPage(prev => prev + 1)} disabled={data?.orders?.length < 15} className={` ${data?.orders?.length < 15 ? "text-gray-300" : null}`}><FaArrowAltCircleRight /></button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default RecentOrderedTable