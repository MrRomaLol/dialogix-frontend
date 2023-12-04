export const cT = (str, ...values) => {
    return str.replace(/\$\{(\d+)}/g, (_, index) => values[index]?.toString() || `\${${index}}`);
}