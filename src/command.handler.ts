import {lookupForDragees} from "./dragee-lookup.ts";
import {lookupForNamespaces} from "./namespace-lookup.ts";
import {lookupForAsserters} from "./namespace-asserter-lookup.ts";
import {processAsserters} from "./process-asserters.ts";

type Options = {
    fromDir: string,
    toDir: string
}

export const handler = async (argument, options: Options) => {
    const dragees = await lookupForDragees(options.fromDir);
    const namespaces = await lookupForNamespaces(dragees);
    const asserters: Asserter[] = await lookupForAsserters(namespaces);
    console.log('namespaces')
    console.log(namespaces)
    console.log('asserters')
    console.log(asserters)
    asserters.forEach(asserter => processAsserters(asserters, dragees));
}