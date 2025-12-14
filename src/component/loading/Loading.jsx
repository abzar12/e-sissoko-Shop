import "./Loading.css"
export default function Loading() {
    return (
        <>
            <div className="flex justify-center items-center content-center h-full">
                <div className="loader">
                    <span className="loader-text">loading</span>
                    <span className="load"></span>
                </div>
            </div>
        </>
    )
}