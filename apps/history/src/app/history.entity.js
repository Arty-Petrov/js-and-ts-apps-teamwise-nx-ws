import { flatten, unflatten } from '@service/utils';
import { clean } from 'fast-clean';


export default class HistoryEntity {
    #id = null;
    #userId = null;
    #status = null;
    #name = null;
    #email = null;
    #dateBirth = null;
    #isAdmin = null;
    #createdAt = null;

    constructor(entity) {
        this.#fillEntity(entity);
    }

    toObject() {
        const entityObject = unflatten({
            'id': this.#id,
            'userId': this.#userId,
            'status': this.#status,
            'createdAt': this.#createdAt,
            'change.name': this.#name,
            'change.email': this.#email,
            'change.dateBirth': this.#dateBirth,
            'change.isAdmin': this.#isAdmin,
        })
        return clean(entityObject);
    }

    #fillEntity(entity) {
        const flatEntity = flatten({...entity});
        this.#id = flatEntity?.id;
        this.#userId = flatEntity?.userId;
        this.#status = flatEntity?.status;
        this.#name = flatEntity?.['change.name'];
        this.#email = flatEntity?.['change.email'];
        this.#dateBirth = flatEntity?.['change.dateBirth'];
        this.#isAdmin = flatEntity?.['change.isAdmin'];
        this.#createdAt = flatEntity?.['change.createdAt'];
    }
}
