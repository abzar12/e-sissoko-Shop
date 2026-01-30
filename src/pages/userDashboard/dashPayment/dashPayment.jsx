import React, { useState, useEffect, useMemo } from "react";
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch";
import {
    FaCreditCard, FaHistory, FaDownload, FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaEyeSlash, FaPlus, FaFilter,
} from "react-icons/fa";
import styles from "./payment.module.css";
import PaymentTable from "./paymentData/paymentTable";
function DashPayment() {
    const [query, setQuery] = useState({
        page: 1,
        limit: 50,
        status: "paid",
        category: "",
        search: ""
    })
    const { data, error, isLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getAll?query=${JSON.stringify(query)}`)
    const [loading, setLoading] = useState(false);
    const FiltterFn = (Status) => {
        setQuery((prev) => {
            return { ...prev, status: Status }
        })
    }
    const SearchFn = (values) => {
        let value = values
        if (value === "failed") {
            value = "cancelled"
        }
        setQuery((prev) => {
            return { ...prev, search: value }
        })
    }
    const decreasePage = () => {
        setQuery((prev) => {
            if (prev.page > 0) {
                return { ...prev, page: prev.page - 1 }
            }
        })
    }
    const increasePage = () => {
        setQuery((prev) => {
            return { ...prev, page: prev.page + 1 }
        })
    }
     const Amount_OrdersPaid = useMemo(() => {
            if (!data?.orders) return 0
            const Amount = data?.orders
            .filter((item) => item.Payment_Status === "paid")
            ?.reduce((acc, currentSum) => {
                return acc + Number(currentSum.Amount || 0)
            }, 0)
            return Amount ? Amount : 0
        }, [data])
        const PaidTransaction = useMemo(() => {
            if (!data?.orders) return 0
            const Amount = data?.orders
            .filter((item) => item.Payment_Status === "paid")
            return Amount ? Amount.length : 0
        }, [data])
        const PendingTransaction = useMemo(() => {
            if (!data?.orders) return 0
            const Amount = data?.orders
            .filter((item) => item.Status === "pending")
            return Amount ? Amount.length : 0
        }, [data])
        const Amount_OrdersPending = useMemo(() => {
            if (!data?.orders) return 0
            const Amount = data?.orders
            .filter((item) => item.Status === "pending")
            ?.reduce((acc, currentSum) => {
                return acc + Number(currentSum.Amount || 0)
            }, 0)
            return Amount ? Amount : 0
        }, [data])

    const getStatusIcon = (status) => {
        switch (status) {
            case "paid":
                return <FaCheckCircle className="text-green-600" />;
            case "pending":
                return <FaClock className="text-yellow-600" />;
            case "cancelled":
                return <FaTimesCircle className="text-red-600" />;
            default:
                return <FaClock className="text-gray-600" />;
        }
    };
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Payment Management
                </h1>
                <p className={styles.subtitle}>Track and manage all your payments</p>
            </div>

            {/* Summary Cards */}
            <div className={styles.summaryGrid}>
                {/* Total Paid Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Total Paid</h3>
                        <div className={`${styles.cardIconBox} ${styles.cardIconBoxGreen}`}>
                            <FaCheckCircle style={{ color: "#16a34a", fontSize: "1.25rem" }} />
                        </div>
                    </div>
                    <p className={styles.cardAmount}>
                        GHS {Amount_OrdersPaid}
                    </p>
                    <p className={styles.cardSubtext}>
                        {PaidTransaction} transactions
                    </p>
                </div>

                {/* Pending Payment Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Pending</h3>
                        <div className={`${styles.cardIconBox} ${styles.cardIconBoxYellow}`}>
                            <FaClock style={{ color: "#b45309", fontSize: "1.25rem" }} />
                        </div>
                    </div>
                    <p className={styles.cardAmount}>
                        GHS {Amount_OrdersPending}
                    </p>
                    <p className={styles.cardSubtext}>
                        {PendingTransaction} transactions
                    </p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className={styles.filterContainer}>
                <div className={styles.filterWrapper}>
                    {/* Search */}
                    <div style={{ flex: 1, width: "100%" }}>
                        <input
                            type="text"
                            placeholder="Search by order reference or amount..."
                            // value={searchTerm}
                            onChange={(e) => SearchFn(e.target.value)}
                            className={`${styles.input} ${styles.searchInput}`}
                        />
                    </div>
                    {/* Filter Buttons */}
                    <div className={styles.filterButtons}>
                        {["all", "paid", "pending", "failed"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => FiltterFn(filter)}
                                className={`${styles.filterButton} ${styles.filterButtonInactive}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className={styles.tableContainer}>
                {/* Desktop View */}
                <div className={styles.tableContainer}>
                    <div className={styles.desktopView}>
                        <PaymentTable data={data?.orders} limit={data.limitPage} offset={data.offset} page={query?.page} onDecrease={decreasePage} onIncrease={increasePage} />
                    </div>
                </div>
                {/* Mobile View */}
                <div className={styles.mobileView}>
                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                        </div>
                    ) : data?.orders?.length === 0 ? (
                        <div className={styles.emptyContainer}>
                            <p className={styles.emptyText}>No payments found</p>
                        </div>
                    ) : (
                        <div className={styles.cardsContainer}>
                            {data?.orders?.map((payment, index) => (
                                <div
                                    key={index}
                                    className={styles.mobileCard}
                                >
                                    <div className={styles.mobileCardHeader}>
                                        <div>
                                            <p className={styles.mobileCardTitle}>
                                                {payment.Reference}
                                            </p>
                                            <p className={styles.mobileCardDate}>
                                                {new Date(payment.Date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div
                                            className={`${styles.mobileCardBadge} ${payment.Payment_Status === "paid"
                                                ? styles.badgeCompleted
                                                : payment.Payment_Status === "pending"
                                                    ? styles.badgePending
                                                    : styles.badgeFailed
                                                }`}
                                        >
                                            {getStatusIcon(payment.Payment_Status)}
                                            <span style={{ textTransform: "capitalize" }}>{payment.status}</span>
                                        </div>
                                    </div>
                                    <div className={styles.mobileCardBody}>
                                        <div className={styles.mobileCardInfo}>
                                            <p className={styles.mobileCardInfoLabel}>Amount</p>
                                            <p className={styles.mobileCardAmount}>
                                                GHS {payment.Amount.toFixed(2)}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p className={styles.mobileCardInfoLabel}>Payment Method</p>
                                            <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#111827" }}>
                                                {payment.Method}
                                            </p>
                                        </div>
                                    </div>
                                    <button className={styles.mobileCardReceiptButton}>
                                        <FaDownload />
                                        Download Receipt
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Info */}
            <div className={styles.footerInfo}>
                <div className={styles.footerIcon}>
                    <FaHistory />
                </div>
                <div className={styles.footerContent}>
                    <h4 className={styles.footerTitle}>Payment History</h4>
                    <p className={styles.footerText}>
                        All your payment transactions are securely stored and can be downloaded as receipts. Keep
                        track of your spending and manage your payment methods easily.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DashPayment;