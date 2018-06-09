const enum Order { None, Asc, Desc }

interface SortMediator {
    createSubject(name: string, onOrderChanged: OnOrderChanged): SortSubject
    removeSubject(subject: SortSubject): void
}

interface SortSubjectInternal {
    readonly name: string
    setOrder(order: Order): void
    getOrder(): Order
}

interface SortSubject {
    flipOrder(): void
}

interface OnRequestOrder {
    (order: Order): void
}

interface OnOrderChanged {
    (sorted: boolean, ascending: boolean): void
}

function mediatorFactory(): SortMediator {
    const subjects = new Set<SortSubjectInternal>()

    return {
        createSubject,
        removeSubject,
    }

    function createSubject(name: string, onOrderChanged: OnOrderChanged): SortSubject {
        const subject = subjectFactory(
                name,
                order => handleChangeOrder(subject, order),
                onOrderChanged,
            )

        subjects.add(subject)
        subject.setOrder(Order.None)

        return subject
    }

    function removeSubject(subject: SortSubject) {
        subjects.delete(subject as any as SortSubjectInternal)
    }

    function handleChangeOrder(eventSubject: SortSubjectInternal, order: Order) {
        subjects.forEach(subject =>
            subject.setOrder(subject === eventSubject ? order : Order.None)
        )
    }
}

function subjectFactory(name: string, onRequestOrder: OnRequestOrder, onOrderChanged: OnOrderChanged): SortSubject & SortSubjectInternal {
    let lastOrder = Order.None

    return {
        name,
        setOrder,
        getOrder,

        flipOrder,
    }

    function setOrder(order: Order) {
        if (lastOrder !== order)
            onOrderChanged(order !== Order.None, order === Order.Asc)

        lastOrder = order
    }

    function getOrder() {
        return lastOrder
    }

    function flipOrder(): void {
        onRequestOrder(lastOrder === Order.Asc ? Order.Desc : Order.Asc)
    }
}

export { mediatorFactory, SortMediator, SortSubject }
