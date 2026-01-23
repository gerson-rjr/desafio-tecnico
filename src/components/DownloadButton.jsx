import { Download } from "lucide-react";

function DownloadButton( {file, name }){
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = file;
        link.download = name;
        link.click();
    };
    return <button className="cursor-pointer" onClick={handleDownload}>Download</button>
}
export default DownloadButton