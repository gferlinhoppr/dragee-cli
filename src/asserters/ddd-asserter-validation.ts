export const asserter = (dragees: Dragee[]) => {
    
    aggregateHasOnlyValueObjectsOrEntities(dragees);
    
    repositoriesAreOnlyInServices(dragees)

};

const dependenciesOf = (rootDragee: Dragee, dragees: Dragee[]) => {
    const depends = Object.keys(rootDragee.depends_on);
    return dragees.filter(dragee => depends.includes(dragee.name));
}

const aggregateHasOnlyValueObjectsOrEntities = (dragees: Dragee[]) => {
    const aggregates = dragees.filter(dragee => dragee.kind_of === 'ddd/aggregate');
    aggregates.forEach((aggregate: Dragee) => {
        dependenciesOf(aggregate, dragees).forEach( (aggregateDependency: Dragee) => {
            const isValid = ['ddd/value_object', 'ddd/entity'].includes(aggregateDependency.kind_of);
            if(!isValid){
                console.log("The aggregate dependency " + aggregateDependency.name +" is not an entity or a value object" );
            }
        });
    });
}

const repositoriesAreOnlyInServices = (dragees: Dragee[]) => {
    const services = dragees.filter(dragee => dragee.kind_of === 'ddd/service');

    services.forEach(service => {
        dependenciesOf(service, dragees).forEach((serviceDependency: Dragee) => {
            const isValid = serviceDependency.kind_of === "ddd/repository";
            if(!isValid){
                console.log("The service dependency " + serviceDependency.name +" is not a repository" );
            }
        })  
    })
    
}

