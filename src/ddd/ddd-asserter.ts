import {AggregateDependencyRule} from "./rules/aggregates-dependency.rule.ts";
import { AggregateMandatoryRule } from "./rules/aggregates-mandatory.rule.ts";
import {RepositoryRule} from "./rules/repositories.rule.ts";
import {ValueObjectRule} from "./rules/value-object.rule.ts"

const asserter: Asserter = (dragees: Dragee[]) => {
    const aggregateDependencyRuleResults = AggregateDependencyRule.apply(dragees)
    const aggregateMandatoryRuleResults = AggregateMandatoryRule.apply(dragees)
    const repositoryRuleResults = RepositoryRule.apply(dragees)
    const valueObjectRuleResults = ValueObjectRule.apply(dragees);

    let flattenResults = [
        aggregateDependencyRuleResults,
        repositoryRuleResults,
        valueObjectRuleResults,
        aggregateMandatoryRuleResults
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