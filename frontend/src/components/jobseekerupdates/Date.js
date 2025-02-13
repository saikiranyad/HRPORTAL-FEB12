function formatDate(item) {
    return new Date(item).toLocaleDateString('en-GB');
}

export default formatDate;