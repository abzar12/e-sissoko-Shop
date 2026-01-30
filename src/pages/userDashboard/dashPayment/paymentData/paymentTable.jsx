import style from "../payment.module.css"
import { useState } from "react"
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { FaTrash, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
function PaymentTable({ data, page, onDecrease, onIncrease, offset, limit }) {
    // const [page, SetPage] =useState(1)
    const [columnFilters, SetColumnFilter] = useState([])
    const columnHelper = createColumnHelper()
    const [show, setShow] = useState(false)
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
        columnHelper.accessor("Amount", {
            header: "Amount",
        }),
        columnHelper.accessor("Date", {
            header: "Date",
           cell: ({ getValue }) => {
                const date = getValue()
                const spliteDate = date.split("T")

                return (<span className=" whitespace-nowrap ">{spliteDate[0]}</span>)
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
                const customers = row.original
                return (
                    <button className={style.receiptButton} onClick={DownloadReceipt}>
                        <FaDownload />
                        Receipt
                    </button>
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
    const DownloadReceipt = async (id) => {
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
            <div className={style.footer_btn}>
                <button onClick={onDecrease} disabled={page == 1} className={` ${page == 1 ? "text-gray-300" : null}`}><FaArrowAltCircleLeft /></button>
                <span className={style.span}> {offset} - {limit}</span>
                <button onClick={onIncrease} disabled={data?.length < 50} className={` ${data?.length < 50 ? "text-gray-300" : null}`}><FaArrowAltCircleRight /></button>
            </div>
        </>
    )
}

export default PaymentTable