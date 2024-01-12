import {expect, test, describe} from "bun:test";

const asserter = (dragees: Dragee[]) => {
    const aggregates = dragees.filter(dragee => dragee.kind_of === 'ddd/aggregate');
    const services = dragees.filter(dragee => dragee.kind_of === 'ddd/service');
    describe('Namespace: DDD', () => {
        test.each(dragees)('Dragee %p', (dragee: Dragee) => {
            expect(dragee).not.toBeUndefined();
        });

        describe('Check aggregate rules', () => {
            
            test.each(aggregates)('Aggregate %p', aggregate => {
                const depends = Object.keys(aggregate.depends_on);

                const dependenciesDragees = dragees.filter(dragee => depends.includes(dragee.name));
                
                dependenciesDragees.forEach( (aggregateDependency: Dragee) => {
                    expect(['ddd/value_object', 'ddd/entity']).toContain(aggregateDependency.kind_of);
                });
            });

        });
        describe('Check service rules', () => {
            test.each(services)('Service %p', service => {
                const depends = Object.keys(service.depends_on);

                const dependenciesDragees = dragees.filter(dragee => depends.includes(dragee.name));
                
                dependenciesDragees.forEach( (serviceDependency: Dragee) => {
                    expect(serviceDependency.kind_of).toBe('ddd/repository');
                });
            });
        })
    })
}

asserter(
    [
        {
            name: 'toto',
            kind_of: 'ddd/aggregate',
            depends_on:
                {
                    'tutu': [
                        'field'
                    ] ,
                    'titi': [
                        'field'
                    ] ,
                    'foo': [
                        'field'
                    ]
                    
                }
        }, 
        {
            name: 'tutu',
            kind_of: 'ddd/value_object',
            depends_on: []
        },
        {
            name:'titi',
            kind_of: 'ddd/value_object'
        },
        {
            name:'foo',
            kind_of: 'ddd/entity'
        }
    ]
);

asserter([
    {
        name: 'toto',
        kind_of: 'ddd/service',
        depends_on:
            {
                'tutu': [
                    'field'
                ] 
            }
    }, 
    {
        name: 'tutu',
        kind_of: 'ddd/repository',
        depends_on: []
    }
])