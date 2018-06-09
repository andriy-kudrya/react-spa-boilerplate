import { Game } from '#/entities/card'

interface CardService {
    getAll(): Promise<Game[]>
}

export default CardService
