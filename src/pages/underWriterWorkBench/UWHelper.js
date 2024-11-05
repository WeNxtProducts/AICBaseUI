export function checkPageType(input) {
 if (input.startsWith('PO')) return 'Policy';
 else if (input.startsWith('PR')) return 'Quotation';
 else return null;
}
