import {expect, test, describe} from "bun:test";

const asserter = (dragees: Dragee[]) => {
    const aggregates = dragees.filter(dragee => dragee.kind_of === 'ddd/aggregate');
    describe('Namespace: DDD', () => {
        test.each(dragees)('Dragee %p', (dragee: Dragee) => {
            expect(dragee).not.toBeUndefined();
        });

        describe('Check aggregate rules', () => {
            
            test.each(aggregates)('Aggregate %p', aggregate => {
                const depends = Object.keys(aggregate
                    .depends_on);

                const dependenciesDragees = dragees.filter(dragee => depends.includes(dragee.name));
                
                dependenciesDragees.forEach
                ( (aggregateDependency: Dragee) => {
                    expect(aggregateDependency.kind_of).toBe('ddd/value_object');
                });

            });
            
            // const startTime = new Date();
            // while (new Date().getTime() - startTime.getTime() < 10000) {}
            // debugger;

        });
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