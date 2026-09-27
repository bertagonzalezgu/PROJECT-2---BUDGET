

export function formatDate(isoString: string): string{
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}