"use client";

interface Props {
  content: string;
  filename: string;
}

export default function DownloadButtons({ content, filename }: Props) {
  function downloadTxt() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadDoc() {
    const head = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>'
    const mid = '</title></head><body><pre>'
    const tail = '</pre></body></html>'
    const html = head + filename + mid + content + tail
    const bom = String.fromCharCode(0xFEFF)
    const blob = new Blob([bom + html], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename + ".doc"
    a.click()
    URL.revokeObjectURL(url)
  }

  function downloadPdf() {
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    document.body.appendChild(iframe)
    const win = iframe.contentWindow
    if (!win) return

    const escape = content.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;")
    const lines = escape.replace(new RegExp("\n", "g"), "<br>")

    win.document.write(
      "<html><head><title>" + filename + "</title>" +
      "<style>" +
      "@page { margin: 20mm 25mm }" +
      "body{font-family:Georgia,serif;font-size:12pt;line-height:1.6;color:#222}" +
      "pre{white-space:pre-wrap;font-family:Georgia,serif}" +
      "</style>" +
      "</head><body><pre>" + lines + "</pre></body></html>"
    )
    win.document.close()
    win.focus()
    win.print()
    setTimeout(function() { document.body.removeChild(iframe) }, 2000)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={downloadTxt} className="btn-secondary text-sm !py-2 !px-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        TXT
      </button>
      <button onClick={downloadDoc} className="btn-secondary text-sm !py-2 !px-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        Word
      </button>
      <button onClick={downloadPdf} className="btn-primary text-sm !py-2 !px-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        PDF
      </button>
    </div>
  );
}
