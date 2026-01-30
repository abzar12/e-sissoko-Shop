import { useState } from "react"
import style from "../viewOrders.module.css"
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { FaTrash,FaShippingFast, FaCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"

function ViewTable({ data, page, onDecrease, onIncrease, offset, limit }) {
    const [columnFilters, SetColumnFilter] = useState([])
    const columnHelper = createColumnHelper()
    const column = [
        columnHelper.accessor("Reference", {
            header: "Order Reference",
            cell: ({ getValue }) => {
                let id = getValue()
                return (
                    <>
                        <p className="line-clamp-1 ">{id}</p>
                    </>
                )
            }
        }),
        columnHelper.accessor("Email", {
            header: "Customer Email",
        }),
        columnHelper.accessor("Amount", {
            header: "Amount",
        }),
        columnHelper.accessor("Price", {
            header: "Price",
        }),
        columnHelper.accessor("Quantity", {
            header: "Quantity",
        }),
        columnHelper.accessor("Date", {
            header: "Date",
            cell: ({ getValue }) => {
                const date = getValue()
                if (date) {

                    const spliteDate = date?.split("T")

                    return (<span className=" whitespace-nowrap ">{spliteDate[0] || 1}</span>)
                }
            }
        }),
        columnHelper.accessor("Method", {
            header: "Method"
        }),
        columnHelper.accessor("Status", {
            header: "Status",
            cell: ({ row }) => {
                const value = row.original
                return (
                    <>
                        {value.Payment_Status === "paid" && <p className="bg-green-50 px-3 py-1 rounded-[50px] text-green-700 border-green-200 flex gap-1 items-center">
                            <FaCheckCircle className="text-green-600" />{value.Payment_Status}
                        </p>}
                        {value.Status === "unpaid" && <p className="bg-red-50 px-3 py-1 rounded-[50px] text-red-700 border-red-200 flex gap-1 items-center">
                            <FaTimesCircle className="text-red-600" />{value.Status}
                        </p>}
                    </>
                )
            }
        }),
        columnHelper.display({
            id: "action",
            header: "Action",
            cell: ({ row }) => {
                    const value = row.original
                    return (
                        <div className="flex justify-between gap-3">
                            {value?.Status?.toLowerCase() === "pending" && <FaCheck className={`${value?.Status?.toLowerCase() !== "pending" ? "text-green-500 cursor-not-allowed pointer-events-none " : "cursor-pointer"}  hover:text-gray-400 transition duration-300`}
                                onClick={() => onUpdateStatus({ value: "confirmed", id: value.ID })}
                                disabled={value?.Status?.toLowerCase() === "confirmed"} />}

                            {value?.Status?.toLowerCase() !== "pending" && value?.Status?.toLowerCase() !== "cancelled" && <FaShippingFast className={`${value?.Status?.toLowerCase() === "delivered" ? "text-green-500 cursor-not-allowed pointer-events-none" : "cursor-pointer"} hover:text-gray-400 transition duration-300`}
                                onClick={() => onUpdateStatus({ value: "delivered", id: value.ID })}
                                disabled={value?.Status?.toLowerCase() === "delivered"} />}

                            {value?.Status?.toLowerCase() !== "cancelled" &&
                                <FaMoneyBillTransfer className={`${value?.Payment_Status?.toLowerCase() === "paid" ? "text-green-500" : null} cursor-pointer hover:text-gray-400 transition duration-300`}
                                    onClick={() => onUpdateStatus({ value: "paid", id: value.ID })} />
                            }

                            {
                                value?.Payment_Status?.toLowerCase() === "unpaid" &&
                                <GiCancel className={`text-red-500 cursor-pointer hover:text-red-800 transition duration-300`}
                                    onClick={() => onUpdateStatus({ value: "cancelled", id: value.ID })} />
                            }
                        </div>
                    )

            }
        }),
    ]
    const table = useReactTable({
        data: data ? data : [],
        columns: column,
        state: {
            columnFilters
        },
        onColumnFiltersChange: SetColumnFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })
    const DownloadReceipt = () => {

    }
    return (
        <>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id} className={style.tableHeadCell}>
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
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className={style.tableBodyRow}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className={style.tableCell}>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default ViewTable