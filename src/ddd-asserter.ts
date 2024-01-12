export const dddAsserter = ((dragees: Dragee[]) => {
    const proc = Bun.spawn(["bun", "test", "../test/dragee-cli.spec.ts"], 
        {
            env: {
                dragees: JSON.stringify(dragees)
            }
        });
    const text = new Response(proc.stdout).text();
    console.log(text);
    
    return "";
})
