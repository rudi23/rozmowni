export function decryptEmail(encoded, subject) {
    const url = 'mailto:' + atob(encoded) + (subject ? `?subject=${subject}` : '');
    window.location.href = url;
}
