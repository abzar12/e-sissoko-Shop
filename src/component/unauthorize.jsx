


export default function Unauthorize() {
    return (
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50 p-8 shadow-lg text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 5.636A9 9 0 115.636 18.364 9 9 0 0118.364 5.636z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 9l-6 6M9 9l6 6"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                    Access Denied
                </h2>

                <p className="mt-3 text-gray-600">
                    You are not authorized to access this page.
                </p>

                <button
                    onClick={() => window.history.back()}
                    className="mt-6 rounded-lg bg-red-600 px-6 py-2.5 text-white font-medium transition hover:bg-red-700"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}