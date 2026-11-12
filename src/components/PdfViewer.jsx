import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer({ file }) {
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [failed, setFailed] = useState(false);

  // Keep the pages exactly as wide as the card, on any screen size
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      {failed ? (
        <p className="text-inksoft" style={{ fontSize: "0.95rem" }}>
          This document couldn't be displayed here.{" "}
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--burnt)", textDecoration: "underline" }}
          >
            Open or download the PDF
          </a>
        </p>
      ) : (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={() => setFailed(true)}
          loading={<p className="text-inksoft">Loading document...</p>}
        >
          <div className="flex flex-col gap-4">
            {width > 0 &&
              Array.from({ length: numPages }, (_, i) => (
                <div
                  key={i + 1}
                  style={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Page
                    pageNumber={i + 1}
                    width={width}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
          </div>
        </Document>
      )}
    </div>
  );
}
