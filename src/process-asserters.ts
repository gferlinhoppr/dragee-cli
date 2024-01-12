import type {Result} from "./fp/result.model.ts";

export const processAsserter = async (asserter: Asserter, dragees: Dragee[]): Promise<Result<Report>[]> => {

    asserter(dragees);

    return [];
}