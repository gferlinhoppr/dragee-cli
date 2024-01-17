import {ko, ok} from "../../fp/result.model.ts";

const isRepository: boolean = (dragee: Dragee) => dragee.kind_of === 'ddd/repository'
const isService: boolean = (dragee: Dragee) => dragee.kind_of === 'ddd/service'

const rule: RuleResult = (dragees: Dragee[]) => {
    const repositoryNames = dragees
        .filter(dragee => isRepository(dragee))
        .map(repository => repository.name)
        
    const drageesWithRepositoryDependencies = dragees
        .map(dragee => {
            
            const repositories: string[]= 
                dragee.depends_on 
                    ? Object.keys(dragee.depends_on).filter(name => repositoryNames.includes(name))
                    : [];
            
            return repositories.map(repository => {
                return {dragee: dragee, repositoryName: repository}
            })
    })
    .flatMap(drageeWithRepo => drageeWithRepo)
    .filter(drageeWithRepo => drageeWithRepo.repositoryName)

    return drageesWithRepositoryDependencies
        .map(drageeWithRepositories => {
            if (isService(drageeWithRepositories.dragee)) {
                return ok<boolean>(true)
            } else {
                return ko<boolean>(new Error(`The repository "${drageeWithRepositories.repositoryName}" must not be a dependency of "${drageeWithRepositories.dragee.kind_of}"`))
            }
        })
}

export const RepositoryRule = {
    apply: rule
}