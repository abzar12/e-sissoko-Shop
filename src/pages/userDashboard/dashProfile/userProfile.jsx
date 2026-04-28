import { useAuth } from '../../../component/Context/authContext/authContext'
import { MdEmail } from "react-icons/md";

import './userProfile.css'
import { FaCartArrowDown, FaLock } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import useDashboardFetch from '../../../component/Context/DashboardContext/dashboardFetch';
import { useState } from 'react';
import useFetchData from '../../../component/fetchProducts/fetchData';

export default function UserProfile() {
    const [query, Setquery] = useState({
        category: [],
        price: [],
        color: [],
        page: 1,
        limit: '',
        search: ""
    })
    const { user } = useAuth()
    const { data } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`) 
    const { data: itemsCount } = useFetchData(`${import.meta.env.VITE_API_URL}/product/getAll?${query}`)
    const { data: OrdersCount } = useFetchData(`${import.meta.env.VITE_API_URL}/orders/getYearly?year=${new Date().getFullYear()}`)
    console.log(data)
    // console.log(OrdersCount)
    const date = new Date(data.date);

    const formattedDate =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");
    const initialsName = `${data?.FirstName?.[0] ?? ""}${data?.LastName?.[0] ?? ""}`;
    return (
        <>
            <div class="profile-card">

                {/* <!-- top: avatar + name + role (minimal) --> */}
                <div class="profile-header">
                    <div class="avatar">{initialsName}</div>
                    <div class="name-role">
                        <h2>{data?.FirstName} {data?.LastName}</h2>
                        <span class="role">{data?.Role} · e‑commerce</span>
                    </div>
                </div>

                {/* <!-- three simple stats – most relevant for an admin --> */}
                <div class="stats-minimal">
                    <div class="stat-item">
                        <div class="stat-label">Net sales</div>
                        <div class="stat-value">$26.4k <small>↑ 8%</small></div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Orders</div>
                        <div class="stat-value">{OrdersCount?.orders?.length}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Items</div>
                        <div class="stat-value">{itemsCount?.products?.length || "***"}<small></small></div>
                    </div>
                </div>

                {/* <!-- detail list – minimal but admin‑specific --> */}
                <div class="detail-list">
                    {/* <!-- email (primary contact) --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><MdEmail /></div>
                        <div class="detail-content">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">{data.Email}</span>
                        </div>
                    </div>
                    {/* <!-- store / shop name – essential e‑commerce context --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><FaCartArrowDown /></div>
                        <div class="detail-content">
                            <span class="detail-label">Store</span>
                            <span class="detail-value highlight">Sissoko. market</span>
                        </div>
                    </div>
                    {/* <!-- role / access level --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><FaLock /></div>
                        <div class="detail-content">
                            <span class="detail-label">Access</span>
                            <span class="detail-value">{data.Role} {data.Role === 'admin' && '· owner'}</span>
                        </div>
                    </div>
                    {/* <!-- joined / tenant – light info --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><FaCalendarDays /></div>
                        <div class="detail-content">
                            <span class="detail-label">Member since</span>
                            <span class="detail-value">{formattedDate}</span>
                        </div>
                    </div>
                </div>

                {/* <!-- very minimal store status – inventory & payment summary (clean) --> */}
                <div class="store-badge mx-1">
                    <span> ⚡ store health</span>
                    <span class="pill">in stock {itemsCount?.products?.length || "***"} items</span>
                    <span class="pill">💳 active</span>
                </div>

                {/* <!-- everything is visible, minimal, and admin‑focused.
         no extra fluff, only what an admin needs at a glance. --> */}
            </div>
        </>
    )
}