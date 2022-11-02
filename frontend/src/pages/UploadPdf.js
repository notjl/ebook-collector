import "./UploadPdf.css"

const UploadPdf = () => {
    return (
        <>
        <div className="uploadPDF"></div>
        <div className="uploadDiv">
            <h1>&lt; U P L O A D &gt;</h1>
            <input type="text" placeholder="Enter Title"></input>
            <input type="text" placeholder="Enter Course Code"></input>
            <input type="file"></input>
            <button type="submit">UPLOAD</button>
        </div>
        </>
    )
}

export default UploadPdf;