function dateFormatter(): (unixTime: number) => string  {
    /**
     * new Intl.DateTimeFormat() is pretty heavy operation
     * so it is moved out into closure
     */
    const format = new Intl.DateTimeFormat()
    return function formatDate(unixTime) {
        return format.format(unixTime * 1000)
    }
}

export { dateFormatter }
