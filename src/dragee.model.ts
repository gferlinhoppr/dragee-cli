import type {Result} from "./fp/result.model.ts";

enum DependencyType {
    CONSTRUCTOR = 'constructor',
    FIELD = 'field',
    METHOD_PARAM = 'method_param',
    METHOD_RETURN = 'method_return'
}

interface Dependency extends Record<string, DependencyType> {
}

interface Dragee {
    name: string,
    kind_of: string,
    depends_on: Dependency[]
}

type Namespace = string;

type Report = {
    pass: boolean,
    errors: string[],
};

type RuleResult = Result<boolean>[]

type Rule = (dragees: Dragee[]) => RuleResult

type Asserter = (dragees: Dragee[]) => Report;