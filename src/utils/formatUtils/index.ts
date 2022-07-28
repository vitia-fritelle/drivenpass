async function formatToken(authorization: string) {
    return authorization.split(' ')[1];
}

const formatUtils = {
    formatToken,
}

export default formatUtils;