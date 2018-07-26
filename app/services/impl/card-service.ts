import { Cards, Game } from '#/entities/card'
import { ajax } from '#/utils/ajax'
import config from '#/constants/config'

import CardService from '../card-service'

function factory(): CardService {
    return {
        getAll,
    }

    function getAll(): Promise<Game[]> {
        return ajax<Cards>({
                url: config.api + '/data/set_data.json',
                method: 'GET',
            })
            .then(_ => _.sets)
    }
}

export default factory
