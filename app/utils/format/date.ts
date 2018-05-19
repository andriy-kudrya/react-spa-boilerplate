function formatDate(unixTime: number): string {
    const unixMSec = unixTime * 1000
        , format = new Intl.DateTimeFormat()

    return format.format(unixMSec)
}

export { formatDate }