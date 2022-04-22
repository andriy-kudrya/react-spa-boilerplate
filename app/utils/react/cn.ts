const cn = (...classes: (false | string | null | undefined)[]) =>
    classes
        .filter(_ => _)
        .join(' ')
        .trim() || undefined

export default cn

