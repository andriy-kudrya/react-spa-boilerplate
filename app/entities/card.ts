interface Cards {
    game_count: number
    sets: Game[]
    time: number
    totals: Totals
    bg_count: number
    emote_count: number
    card_count: number
}

interface Game {
    added: number
    normal: Card
    appid: string
    discount: string
    game: string
    bgs_avg: string
    true_count: number
    foil: Card | null
    f2p: boolean
    emotes_count: number
    emotes_avg: string
    bprice: string | null
    bgs_count: number
}

interface Card {
    count: number
    std: string
    price: string
    avg: string
    quantity: number
}

interface Totals {
    foil: string
    combined: string
    normal: string
}

export { Cards, Game, Card, Totals }
