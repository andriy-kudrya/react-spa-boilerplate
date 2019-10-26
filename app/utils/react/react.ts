type ClassesParam = string | undefined | null | false

const classes = (...params: ClassesParam[]) =>
        params.reduce<string>(
            (acc, v) => v ? acc.concat(' ', v) : acc,
            ''
        ) || undefined

const cn = (classes: TemplateStringsArray, ...conditions: (boolean | null | undefined)[]) =>
        classes
            .reduce(
                (acc, v, idx) =>
                    conditions[idx - 1] ? acc + ' ' + v : acc
            )
            .replace(/\s{2,}/g, ' ')
            .trim() || undefined

export { classes, cn }

