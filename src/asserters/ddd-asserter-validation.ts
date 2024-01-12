export const asserter = (dragees: Dragee[]) => {
    
    const aggregateRuleResult = aggregateHasOnlyValueObjectsOrEntities(dragees);
    
    const repositoryRuleResult = repositoriesAreOnlyInServices(dragees)
    

    return aggregateRuleResult + repositoryRuleResult;
};

const dependenciesOf = (rootDragee: Dragee, dragees: Dragee[]) => {
    const depends = Object.keys(rootDragee.depends_on);
    return dragees.filter(dragee => depends.includes(dragee.name));
}

const aggregateHasOnlyValueObjectsOrEntities: RuleResult = (dragees: Dragee[]) => {
    const aggregates = dragees.filter(dragee => dragee.kind_of === 'ddd/aggregate');
    let result = "";
    aggregates.forEach((aggregate: Dragee) => {
        dependenciesOf(aggregate, dragees).forEach( (aggregateDependency: Dragee) => {
            const isValid = ['ddd/value_object', 'ddd/entity'].includes(aggregateDependency.kind_of);
            if(!isValid){
                result += " / The aggregate dependency " + aggregateDependency.name +" is not an entity or a value object";
            }
        });
    });
    return result;
}

const repositoriesAreOnlyInServices: RuleResult = (dragees: Dragee[]) => {
    const services = dragees.filter(dragee => dragee.kind_of === 'ddd/service');
    let result = "";
    services.forEach(service => {
        dependenciesOf(service, dragees).forEach((serviceDependency: Dragee) => {
            const isValid = serviceDependency.kind_of === "ddd/repository";
            if(!isValid){
               result +=  " / The service dependency " + serviceDependency.name +" is not a repository";
            }
        })  
    })
    return result;
}

