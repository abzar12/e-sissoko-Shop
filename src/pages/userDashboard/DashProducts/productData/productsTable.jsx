import { useState } from "react"
import { Link } from "react-router-dom"
import style from "../products.module.css"
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { FaEdit, FaTrash, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"
function ProdductTable({ data, page, onDecrease, onIncrease, offset, limit }) {
    // const [page, SetPage] =useState(1)
    const [columnFilters, SetColumnFilter] = useState([])
    const columnHelper = createColumnHelper()
    const [show, setShow] = useState(false)
    const column = [
        columnHelper.accessor("uuid", {
            header: "ID"
        }),
        columnHelper.accessor("Name", {
            header: "Products",
            cell: ({ getValue }) => {
                const value = getValue()
                return (
                    <span className= {` ${show ? "line-clamp-3": "line-clamp-1"}  w-[170px] `}  onClick={() => setShow(!show)}>{value}</span>
                )
            }
        }),
        columnHelper.accessor("Category", {
            header: "Categories"
        }),
        columnHelper.accessor("Brand", {
            header: "Brand"
        }),
        columnHelper.accessor("Model", {
            header: "Model"
        }),
        columnHelper.accessor("Price", {
            header: "Price"
        }),
        columnHelper.accessor("Promot_Price", {
            header: "Promot Price"
        }),
        columnHelper.accessor("Quantity", {
            header: "Quantity",
            cell: ({ getValue }) => {
                const value = getValue()
                let ClassMap
                if (value > 5) {
                    ClassMap = "bg-green-500 p-2 rounded-[50%] text-white"
                }
                if (value < 5) {
                    ClassMap = "bg-yellow-500 p-2 rounded-[50%] text-white"
                }
                if (value === 0) {
                    ClassMap = "bg-red-500 p-2 rounded-[50%] text-white"
                }
                return (
                    <span className={ClassMap}>
                        {value}
                    </span>
                )
            }
        }),
         columnHelper.accessor("status", {
            header: "Status",
             cell: ({ getValue }) => {
                const status = getValue().toLowerCase();
                const ClassMap = {
                    out_of_stock: "bg-blue-600 px-3 py-1 rounded-full text-white text-[0.9rem] ",
                    // pending: "bg-yellow-500 px-3 py-1 rounded-full text-white text-[0.9rem]",
                    archived: "bg-red-500 px-3 py-1 rounded-full text-white text-[0.9rem]",
                    active: "bg-green-600 px-3 py-1 rounded-full text-white text-[0.9rem]",
                }
                return (
                    <span className={ClassMap[status]}>
                        {status}
                    </span>
                )
            }
        }),
        columnHelper.accessor("Color", {
            header: "Color"
        }),
        columnHelper.accessor("Shipping", {
            header: "Shipping"
        }),
        columnHelper.accessor("Delevery", {
            header: "Delevery"
        }),
        columnHelper.accessor("Warranty", {
            header: "Warranty"
        }),
        columnHelper.accessor("Contact_Email", {
            header: "Email"
        }),
        columnHelper.accessor("Description", {
            header: "Description",
            cell: ({ getValue }) => {
                const value = getValue()
                return (
                    <span className={` ${show ? "line-clamp-3": "line-clamp-1"} `}  onClick={() => setShow(!show)}>{value}</span>
                )
            }
        }),
        columnHelper.accessor("Created_At", {
            header: "Date"
        }),
        columnHelper.display({
            id: "action",
            header: "Action",
            cell: ({ row }) => {
                const products = row.original
                return(
                    <div className = "flex justify-center gap-3" >
                    <Link to={`/e-dashboard/edit-product?Id=${products.uuid}`}>
                        <FaEdit
                            className="cursor-pointer hover:text-gray-400 transition duration-300"
                            onClick={() => console.log("view")}
                        />
                    </Link>
                        <FaTrash
                            className="text-red-500 cursor-pointer hover:text-red-800 transition duration-300"
                            onClick={() => DeleteProductFn(products.uuid)}
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
const DeleteProductFn = async (uuid)  => {
    try {
        const resp = await fetch (`${import.meta.env.VITE_API_URL}/product/deleteProduct/${uuid}`, {
            method: "PUT",
            headers: { "Content-Type" : "application/json"}
        })

        const data = await resp.json()
        if(!resp.ok){
            throw new Error(`Deleting Failed Error: ${data.mesage}`);
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

export default ProdductTable