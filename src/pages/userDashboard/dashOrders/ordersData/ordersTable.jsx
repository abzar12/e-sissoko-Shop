import { useState } from "react"
import { Link } from "react-router-dom"
import style from "../orders.module.css"
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { FaEye, FaTrash, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCheck, FaShippingFast } from "react-icons/fa"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi";

function OrdersTable({ data, page, onDecrease, onIncrease, offset, limit, onUpdateStatus }) {
    // const [page, SetPage] =useState(1)
    const [columnFilters, SetColumnFilters] = useState([])
    const columnHelper = createColumnHelper()
    // const [show, setShow] = useState(false)
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
                    confirmed: "bg-blue-600 px-3 py-1 rounded-full text-white text-[0.9rem] ",
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
            cell: ({ row }) => {
                const value = row.original
                return (
                    <div className="flex justify-between gap-3">
                        {value.Status.toLowerCase() === "pending" && <FaCheck className={`${value.Status.toLowerCase() !== "pending" ? "text-green-500 cursor-not-allowed pointer-events-none " : "cursor-pointer"}  hover:text-gray-400 transition duration-300`}
                            onClick={() => onUpdateStatus({ value: "confirmed", id: value.ID })}
                            disabled={value.Status.toLowerCase() === "comfirmed"} />}

                        {value.Status.toLowerCase() !== "pending" && value.Status.toLowerCase() !== "cancelled" && <FaShippingFast className={`${value.Status.toLowerCase() === "delivered" ? "text-green-500 cursor-not-allowed pointer-events-none" : "cursor-pointer"} hover:text-gray-400 transition duration-300`}
                            onClick={() => onUpdateStatus({ value: "delivered", id: value.ID })}
                            disabled={value.Status.toLowerCase() === "delivered"} />}

                        {value.Status.toLowerCase() !== "cancelled" &&
                            <FaMoneyBillTransfer className={`${value.Payment_Status.toLowerCase() === "paid" ? "text-green-500" : null} cursor-pointer hover:text-gray-400 transition duration-300`}
                                onClick={() => onUpdateStatus({ value: "paid", id: value.ID })} />
                        }

                        <FaEye className={` cursor-pointer hover:text-gray-400 transition duration-300`}
                            onClick={() => console.log("view")} />

                        {
                            value.Payment_Status.toLowerCase() === "unpaid" &&
                            <GiCancel className={`text-red-500 cursor-pointer hover:text-red-800 transition duration-300`}
                                onClick={() => onUpdateStatus({ value: "cancelled", id: value.ID })} />
                        }
                    </div>
                )

            }
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
    // const DeleteProductFn = async (uuid) => {
    //     try {
    //         const resp = await fetch(`${import.meta.env.VITE_API_URL}/product/deleteProduct/${uuid}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" }
    //         })

    //         const data = await resp.json()
    //         if (!resp.ok) {
    //             throw new Error(`Deleting Failed Error: ${data.mesage}`);
    //         }
    //         console.log("Deleting Data: ", data)
    //     } catch (error) {
    //         throw new Error(`Deleting Failed ERROR: ${error.message}`);
    //     }
    // }
    return (
        <>
            <table >
                <thead className={style.headerBox}>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className={style.titleBox}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id} className={style.title}>
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
                            <tr key={row.id} className={style.Row}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className={style.Column}>
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
            <div className={style.footer_btn}>
                <button onClick={onDecrease} disabled={page == 1} className={` ${page == 1 ? "text-gray-300" : null}`}><FaArrowAltCircleLeft /></button>
                <span className={style.span}> {offset} - {limit}</span>
                <button onClick={onIncrease} disabled={data?.orders?.length < 15} className={` ${data?.orders?.length < 15 ? "text-gray-300" : null}`}><FaArrowAltCircleRight /></button>
            </div>
        </>
    )
}

export default OrdersTable