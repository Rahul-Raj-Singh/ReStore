export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function getDecimalNumber(num: number, precision: number = 2) {
    return Number((num / Math.pow(10, precision)).toFixed(precision))
}