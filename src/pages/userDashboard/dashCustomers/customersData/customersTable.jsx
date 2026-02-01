import { useState } from "react"
import { Link } from "react-router-dom"
import style from "../customers.module.css"
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { FaTrash, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
function CustomersTable({ data, page, onDecrease, onIncrease, offset, limit }) {
    // const [page, SetPage] =useState(1)
    const [columnFilters, SetColumnFilter] = useState([])
    const columnHelper = createColumnHelper()
    const [show, setShow] = useState(false)
    const column = [
        columnHelper.accessor("User_ID", {
            header: "ID",
            cell: ({ getValue }) => {
                let id = getValue()
                return (
                    <>
                        <p className="min-w-[150px]">{id}</p>
                    </>
                )
            }
        }),
        columnHelper.accessor("FirstName", {
            header: "FirstName",
        }),
        columnHelper.accessor("LastName", {
            header: "LastName"
        }),
        columnHelper.accessor("Phone", {
            header: "Number"
        }),
        columnHelper.accessor("Email", {
            header: "Email"
        }),
        columnHelper.accessor("Amount", {
            header: "Amount"
        }),
        columnHelper.accessor("Quantity", {
            header: "Quantity",
        }),
        columnHelper.accessor("Status", {
            header: "Status",
            cell: ({ getValue }) => {
                const value = getValue()
                return (
                    <>
                        {value === "paid" && <p className="bg-green-50 px-3 py-1 rounded-[50px] text-green-700 border-green-200 flex gap-1 items-center">
                            <FaCheckCircle className="text-green-600" />{value}
                        </p>}
                        {value === "unpaid" && <p className="bg-red-50 px-3 py-1 rounded-[50px] text-red-700 border-red-200 flex gap-1 items-center">
                            <FaTimesCircle className="text-red-600" />{value}
                        </p>}
                    </>
                )
            }
        }),
        columnHelper.accessor("Area", {
            header: "Area"
        }),
        columnHelper.accessor("City", {
            header: "City"
        }),

        columnHelper.accessor("Created_at", {
            header: "Date",
            cell: ({ getValue }) => {
                const date = getValue()
                const spliteDate = date?.split("T") || Date()

                return (<span className=" whitespace-nowrap ">{spliteDate[0]}</span>)
            }
        }),
        columnHelper.display({
            id: "action",
            header: "Action",
            cell: ({ row }) => {
                const customers = row.original
                return (
                    <div className="flex justify-center gap-3" >
                        <Link to={`/e-dashboard/edit-product?Id=${customers.User_ID}`}>
                            <FaEye
                                className="cursor-pointer hover:text-gray-400 transition duration-300"
                                onClick={() => console.log("view")}
                            />
                        </Link>
                        <FaTrash
                            className="text-red-500 cursor-pointer hover:text-red-800 transition duration-300"
                            onClick={() => DeleteProductFn(customers.User_ID)}
                        />
                    </div >
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
    const DeleteProductFn = async (id) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/deleteCustomer/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            const data = await resp.json()
            if (!resp.ok) {
                throw new Error(`Deleting Failed Error: ${data.message}`);
            }
            console.log("Deleting Data: ", data)
        } catch (error) {
            throw new Error(`Deleting Failed ERROR: ${error.message}`);
        }
    }
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
                <button onClick={onIncrease} disabled={data?.length < 15} className={` ${data?.length < 15 ? "text-gray-300" : null}`}><FaArrowAltCircleRight /></button>
            </div>
        </>
    )
}

export default CustomersTable