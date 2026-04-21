/**
 * Institutional Data Formatters
 */

// Format Currency to Institutional Standard (INR)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Format Date to Technical Blueprint (DD MMM YYYY)
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

// Global CSV Exporter for Institutional Reports
export const exportToCSV = (data, filename = 'report') => {
    if (!data || !data.length) return;
    
    // Extract headers
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','), // header row
        ...data.map(row => 
            headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(',')
        )
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
