import {AggregateRule} from "./rules/aggregates.rule.ts";
import {RepositoryRule} from "./rules/repositories.rule.ts";
import {ValueObjectRule} from "./rules/value-object.rule.ts"

const asserter: Asserter = (dragees: Dragee[]) => {
    const aggregateRuleResults = AggregateRule.apply(dragees)
    const repositoryRuleResults = RepositoryRule.apply(dragees)
    const valueObjectRuleResults = ValueObjectRule.apply(dragees);

    let flattenResults = [
        aggregateRuleResults,
        repositoryRuleResults,
        valueObjectRuleResults
    ].flatMap(result => result);

    const errors = flattenResults
        .filter(result => result.status === 'error')
        .map(result => {
            if (result.status === 'error') {
                return result.error.message
            }
        })
    return {
        pass: errors.length === 0,
        errors: errors,
    }
}

export const DddAsserter = asserter