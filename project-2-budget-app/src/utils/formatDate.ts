

export function formatDate(isoString: string): string{
    const date = new Date(isoString);
    return date.toLocaleDateString("ca-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}