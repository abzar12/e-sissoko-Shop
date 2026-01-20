// import { useEffect, useState } from "react"

// function useOrders(page, limit){
//     const [Orders, setOrders] = useState([])
//     const [error, SetError] = useState(null)
//     const [isLoading, setIsLoding] = useState(null)

//     useEffect(() => {
//         setIsLoding(true)
//         const getData = async () => {
//             try {
//                 const resp = await fetch(`${import.meta.env.API_URL}/orders/getAll?page=${page}&limit=${limit}`, {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json" }
//                 })
//                 const data = resp.json()
//                 if (!resp.ok) {
//                     console.log("Getting Orders Failed")
//                     throw new Error(`Error: ${data.message}`);
//                 }
//                  console.log("Orders Successfully", Orders)
//                 setOrders(data.response)
//             } catch (error) {
//                 console.log(error.message)
//                 SetError(error.message)
//             } finally {
//                 setIsLoding(false)
//             }
//         }
//         getData()
//     }, [page, limit])

//     return { Orders, error, isLoading }
// }
// export default useOrders
// {
//     id: "#ORD-1023", customer: "Jone Doe", product: "Iphone 14", date: "2026-01-12", payment: "Cart", amount: "$120.00", status: "pending"
// },
// {
//     id: "#ORD-104", customer: "Michal Dao", product: "Laptop", date: "2026-01-12", payment: "Cast", amount: "$120.00", status: "paid"
// },
// {
//     id: "#ORD-105", customer: "Smith Bah", product: "Protector", date: "2026-01-12", payment: "Cast", amount: "$120.00", status: "delivered"
// },
// {
//     id: "#ORD-1026", customer: "Grace Aboko", product: "Cable", date: "2026-01-12", payment: "Cart", amount: "$120.00", status: "cancelled"
// },
// {
//     id: "#ORD-1034", customer: "Mohamadou Coulibaly", product: "Iphone 16", date: "2026-01-12", payment: "Cart", amount: "$120.00", status: "pending"
// },
// {
//     id: "#ORD-1034", customer: "Mohamadou Coulibaly", product: "Iphone 16", date: "2026-01-12", payment: "Cart", amount: "$120.00", status: "pending"
// },
// {
//     id: "#ORD-1034", customer: "Mohamadou Coulibaly", product: "Iphone 16", date: "2026-01-12", payment: "Cart", amount: "$120.00", status: "pending"
// },
// {
//     id: "#ORD-1034", customer: "Mohamadou Coulibaly", product: "Iphone 16", date: "2026-01-12", payment: "Cart", amount: "$120.00", status: "pending"
// }
// ]