import { useState } from "react"
import { Link } from "react-router-dom"
import style from "../../dashCustomers/customers.module.css"
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { FaTrash, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEdit } from "react-icons/fa"
function UsersTable({ data, page, onDecrease, onIncrease, offset, limit }) {
    // const [page, SetPage] =useState(1)
    const [columnFilters, SetColumnFilter] = useState([])
    const columnHelper = createColumnHelper()
    const column = [
        columnHelper.accessor("User_ID", {
            header: "ID",
            cell: ({ getValue }) => {
                let id = getValue()
                return (
                    <>
                        <p className="line-clamp-1 ">{id}</p>
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
        columnHelper.accessor("Role", {
            header: "Role",
        }),
        columnHelper.accessor("Create_at", {
            header: "Date",
            cell: ({ getValue }) => {
                const date = getValue()
                console.log(date)
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
                            <FaEdit
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
        console.log(id)
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/users/deleteUsers/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
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

export default UsersTable