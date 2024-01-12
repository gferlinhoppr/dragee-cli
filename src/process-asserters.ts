import type {Result} from "./fp/result.model.ts";

export const processAsserter = async (asserter: Asserter, dragees: Dragee[]): Promise<Result<Report>> => {

    const report: Report = asserter(dragees);
    console.log(report);
    return report;
}