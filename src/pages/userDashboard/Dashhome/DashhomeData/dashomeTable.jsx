
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { Orders } from "./orders.js";
import style from "../dashome.module.css"
import { useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";

function RecentOrderedTable() {
    const [columnFilters, SetColumnFilters] = useState([])
    const columnHelper = createColumnHelper()

    const column = [
        columnHelper.accessor("id", {
            header: "Order ID"
        }),
        columnHelper.accessor("customer", {
            header: "Customer"
        }),
        columnHelper.accessor("product", {
            header: "Products"
        }),
        columnHelper.accessor("date", {
            header: "Date"
        }),
        columnHelper.accessor("payment", {
            header: "Payment"
        }),
        columnHelper.accessor("amount", {
            header: "Amount"
        }),
        columnHelper.accessor("status", {
            header: "Status",
            accessoryKey: "status",
            cell: ({ getValue }) => {
                const status = getValue().toLowerCase();
                const ClassMap = {
                    paid: "bg-blue-600 px-3 py-1 rounded-full text-white text-[0.9rem]",
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
        data: Orders,
        columns: column,
        state: {
            columnFilters
        },
        onColumnFiltersChange: SetColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    console.log(table);
    return (
        <>
            <div className={style.OrderContainer}>
                <div className={style.OrderHeader}>
                    <h1 className={style.OrderTitle}>Recent Orders</h1>
                    <div className={style.FilterBox}>
                        <select className={style.filter}
                            value={table.getColumn("status").getFilterValue() ?? ""}
                            onChange={(e) =>
                                table.getColumn("status")?.setFilterValue(e.target.value)
                            }
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
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
                </div>
            </div>

        </>
    )
}
export default RecentOrderedTable