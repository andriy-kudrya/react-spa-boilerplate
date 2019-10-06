import SortState from '#/entities/sort-state'

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

function mediatorFactory(onChange: (state: SortState) => void): SortMediator {
    let subjects: SortSubjectInternal[] = []

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

        subjects = subjects.concat(subject)
        subject.setOrder(Order.None)

        return subject
    }

    function removeSubject(subject: SortSubject) {
        subjects = subjects.filter(_ => _ !== subject as any)
    }

    function handleChangeOrder(eventSubject: SortSubjectInternal, order: Order) {
        subjects.forEach(
            _ => _.setOrder(_ === eventSubject ? order : Order.None)
        )

        fireState()
    }

    function fireState() {
        const subject = subjects.filter(_ => _.getOrder() !== Order.None)[0]

        if (!subject) {
            onChange([])
            return
        }

        const state: SortState = [{
            name: subject.name,
            order: subject.getOrder() === Order.Asc ? 'asc' : 'desc',
        }]

        onChange(state)
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

    function flipOrder() {
        onRequestOrder(lastOrder === Order.Asc ? Order.Desc : Order.Asc)
    }
}

export { mediatorFactory, SortMediator, SortSubject }
