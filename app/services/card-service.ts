import { CardSets } from '#/entities/card'

interface CardService {
    getAll(): Promise<CardSets[]>
}

export default CardService