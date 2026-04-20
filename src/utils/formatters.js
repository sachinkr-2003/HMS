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

// Format ID with Prefix
export const formatTerminalID = (id, prefix = 'HR-OP') => {
    return `${prefix}-${id.toString().padStart(6, '0')}`;
};
