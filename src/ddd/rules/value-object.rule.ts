import {ko, ok} from "../../fp/result.model.ts";

const dependenciesOf: Dragee[] = (dragee: Dragee, allDragees: Dragee[]) => {
    if(!dragee.depends_on){
        return [];
    }
    
    return Object.keys(dragee.depends_on)
        .map(dependency => allDragees.find(dragee => dragee.name === dependency))
        .filter(dragee => dragee !== undefined)
}

const isValueObject: boolean = (dragee: Dragee) => dragee.kind_of === 'ddd/value_object'
const isEntity: boolean = (dragee: Dragee) => dragee.kind_of === 'ddd/entity'

const rule: RuleResult = (dragees: Dragee[]) => {
    const valueObjects = dragees.filter(dragee => isValueObject(dragee))
    
    return valueObjects.map(valueObject => {
        return dependenciesOf(valueObject, dragees)
            .map(dependencyDragee => {
                if (isEntity(dependencyDragee)) {
                    return ok<boolean>(true)
                } else {
                    return ko<boolean>(new Error(`The value object "${valueObject.name}" must not have any dependency of type "${dependencyDragee.kind_of}"`))
                }
            })
    })
        .flatMap(result => result)
}

export const ValueObjectRule = {
    apply: rule
}