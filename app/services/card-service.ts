import type { Game } from '_/entities/card'

interface CardService {
    getAll(): Promise<Game[]>
}

export default CardService
