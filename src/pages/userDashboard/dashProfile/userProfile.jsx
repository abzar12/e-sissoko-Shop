import { useAuth } from '../../../component/Context/authContext/authContext'
import { MdEmail } from "react-icons/md";

import './userProfile.css'
import { FaCartArrowDown, FaLock } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import useDashboardFetch from '../../../component/Context/DashboardContext/dashboardFetch';

export default function UserProfile() {
    const {user} = useAuth()
    const {users} = useDashboardFetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
    return (
        <>
            <div class="profile-card">

                {/* <!-- top: avatar + name + role (minimal) --> */}
                <div class="profile-header">
                    <div class="avatar">MM</div>
                    <div class="name-role">
                        <h2>{user.firstname} {user.User_ID}</h2>
                        <span class="role">{user.role} · e‑commerce</span>
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
                        <div class="stat-value">343</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Conversion</div>
                        <div class="stat-value">4.6<small>%</small></div>
                    </div>
                </div>

                {/* <!-- detail list – minimal but admin‑specific --> */}
                <div class="detail-list">
                    {/* <!-- email (primary contact) --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><MdEmail /></div>
                        <div class="detail-content">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">{user.email}</span>
                        </div>
                    </div>
                    {/* <!-- store / shop name – essential e‑commerce context --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><FaCartArrowDown /></div>
                        <div class="detail-content">
                            <span class="detail-label">Store</span>
                            <span class="detail-value highlight">minimalist. market</span>
                        </div>
                    </div>
                    {/* <!-- role / access level --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><FaLock /></div>
                        <div class="detail-content">
                            <span class="detail-label">Access</span>
                            <span class="detail-value">{user.role} {user.role ==='admin' && '· owner'}</span>
                        </div>
                    </div>
                    {/* <!-- joined / tenant – light info --> */}
                    <div class="detail-row">
                        <div class="detail-icon"><FaCalendarDays /></div>
                        <div class="detail-content">
                            <span class="detail-label">Member since</span>
                            <span class="detail-value">Mar 2022</span>
                        </div>
                    </div>
                </div>

                {/* <!-- very minimal store status – inventory & payment summary (clean) --> */}
                <div class="store-badge">
                    <span> ⚡ store health</span>
                    <span class="pill">in stock 1.4k items</span>
                    <span class="pill">💳 active</span>
                </div>

                {/* <hr> */}

                    {/* <!-- minimal footer: two additional e‑commerce admin micro details (no clutter) --> */}
                    <div class="footer-note">
                        <div>🆔 store ID: MW‑8372</div>
                        <div>📦 last inventory sync: today 09:34</div>
                    </div>

                    {/* <!-- everything is visible, minimal, and admin‑focused.
         no extra fluff, only what an admin needs at a glance. --> */}
            </div>
        </>
    )
}