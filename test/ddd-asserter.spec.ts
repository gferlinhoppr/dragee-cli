import {describe, expect, test} from "bun:test";
import {DddAsserter} from "../src/ddd/ddd-asserter.ts";

const asserter = DddAsserter
describe('DDD Asserter', () => {

    test('assert with no dragees', () => {
        const report: Report = asserter([])
        expect(report.pass).toBeTrue()
    });

    describe('Aggregate Rules', () => {
        describe('An aggregate must contain only value objects and/or entities', () => {
            test('Rule passed', () => {
                const valueObjectDragee: Dragee = {
                    name: 'AValueObject',
                    kind_of: 'ddd/value_object',
                }
                const entityDragee: Dragee = {
                    name: 'AEntity',
                    kind_of: 'ddd/entity',
                }
                const aggregateDragee: Dragee = {
                    name: 'AnAggregate',
                    kind_of: 'ddd/aggregate',
                    depends_on: {
                        'AEntity': ['field'],
                        'AValueObject': ['field'],
                    }
                }

                const report = asserter([valueObjectDragee, entityDragee, aggregateDragee])

                expect(report.pass).toBeTrue()
            })
            test('Rule failed', () => {
                const serviceDragee: Dragee = {
                    name: 'AService',
                    kind_of: 'ddd/service',
                }
                const aggregateDragee: Dragee = {
                    name: 'AnAggregate',
                    kind_of: 'ddd/aggregate',
                    depends_on: {
                        'AService': ['field']
                    }
                }

                const report = asserter([serviceDragee, aggregateDragee])

                expect(report.pass).toBeFalse()
                expect(report.errors).toContain(
                    'The aggregate "AnAggregate" must not have any dependency of type "ddd/service"'
                )
            })
        })
    })
    describe('Repository Rules', () => {
        describe('A repository must be called only inside a Service', () => {
            test('Rule passed', () => {
                const repositoryDragee: Dragee = {
                    name: 'ARepository',
                    kind_of: 'ddd/repository',
                }
                const serviceDragee: Dragee = {
                    name: 'AService',
                    kind_of: 'ddd/service',
                    depends_on: {
                        'ARepository': ['field'],
                    }
                }

                const report = asserter([repositoryDragee, serviceDragee])
                expect(report.pass).toBeTrue()
            })
            test('Rule failed', () => {
                const repositoryDragee: Dragee = {
                    name: 'ARepository',
                    kind_of: 'ddd/repository',
                }
                const valueObjectDragee: Dragee = {
                    name: 'AValueObject',
                    kind_of: 'ddd/value_object',
                    depends_on: {
                        'ARepository': ['field']
                    }
                }

                const report = asserter([repositoryDragee, valueObjectDragee])

                expect(report.pass).toBeFalse()
                expect(report.errors).toContain(
                    'The repository "ARepository" must not be a dependency of "ddd/value_object"'
                )
            })
            test('Rule failed multiple repositories in same dragee', () => {
                const repositoryDragee1: Dragee = {
                    name: 'ARepository1',
                    kind_of: 'ddd/repository',
                }
                const repositoryDragee2: Dragee = {
                    name: 'ARepository2',
                    kind_of: 'ddd/repository',
                }
                const valueObjectDragee: Dragee = {
                    name: 'AValueObject',
                    kind_of: 'ddd/value_object',
                    depends_on: {
                        'ARepository1': ['field'],
                        'ARepository2': ['field']
                    }
                }

                const report = asserter([repositoryDragee1, repositoryDragee2, valueObjectDragee])

                expect(report.pass).toBeFalse()
                expect(report.errors).toContain(
                    'The repository "ARepository1" must not be a dependency of "ddd/value_object"'
                )
                expect(report.errors).toContain(
                    'The repository "ARepository2" must not be a dependency of "ddd/value_object"'
                )
            })
        })
    })
})