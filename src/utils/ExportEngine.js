import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Institutional Data Export Engine
 */
export const ExportEngine = {
    /**
     * Export to PDF (Clinical Grade)
     */
    toPDF: (title, headers, data, filename = 'HMS-Report') => {
        const doc = jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        
        // Add Institutional Header
        doc.setFontSize(18);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text('HealthRekha Multispeciality Hospital', 14, 20);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Report Type: ${title}`, 14, 27);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);
        doc.setLineWidth(0.5);
        doc.line(14, 35, 196, 35);

        // Generate Table
        doc.autoTable({
            startY: 40,
            head: [headers],
            body: data,
            theme: 'grid',
            headStyles: { 
                fillColor: [15, 23, 42], 
                textColor: [255, 255, 255], 
                fontSize: 9, 
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: { fontSize: 8, textColor: [50, 50, 50], halign: 'center' },
            alternateRowStyles: { fillColor: [249, 250, 251] }, // gray-50
            margin: { top: 40 },
        });

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Institutional Surveillance Documentation • Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10);
        }

        doc.save(`${filename}-${Date.now()}.pdf`);
    },

    /**
     * Export to Excel (Data Analytic Grade)
     */
    toExcel: (title, headers, data, filename = 'HMS-Data') => {
        const worksheet = XLSX.utils.json_to_sheet(data.map(row => {
            const obj = {};
            headers.forEach((h, i) => {
                obj[h] = row[i];
            });
            return obj;
        }));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Institutional Log");
        XLSX.writeFile(workbook, `${filename}-${Date.now()}.xlsx`);
    }
};
