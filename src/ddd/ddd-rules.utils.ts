import type {DDDKind} from "./ddd.model";
import type {Dragee} from "../dragee.model.ts";

export const dependenciesOf: Dragee[] = (dragee: Dragee, allDragees: Dragee[]) => {
    if (!dragee.depends_on) {
        return [];
    }

    return Object.keys(dragee.depends_on)
        .map(dependency => allDragees.find(dragee => dragee.name === dependency))
        .filter(dragee => dragee !== undefined)
}

const kindOf: boolean = (dragee: Dragee, kind: DDDKind) => dragee.kind_of === kind

export const isAggregate: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/aggregate')
export const isEntity: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/entity')
export const isEvent: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/event')
export const isRepository: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/repository')
export const isService: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/service')
export const isValueObject: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/value_object')
export const isFactory: boolean = (dragee: Dragee) => kindOf(dragee, 'ddd/factory')

export const valueObjects = (dragees: Dragee[]) => dragees.filter(dragee => isValueObject(dragee))

