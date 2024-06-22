import {React, useEffect , useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const ImageViewer = ({ pdfURL }) => {
    const [isPDF, setIsPDF] = useState(true);
  
    useEffect(() => {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, []);
  
    const displayDefault = () => {
      setIsPDF(false); // Set isPDF to false if there's an error loading the PDF
    }
  
    if (!isPDF) {
      return (
        <img
          src={pdfURL}
          className="image-list"
          alt="Preview"
        />
      );
    }
  
    return (
      <div className='image-list'>
        <Document file={pdfURL} onLoadError={displayDefault}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  };

export default ImageViewer;