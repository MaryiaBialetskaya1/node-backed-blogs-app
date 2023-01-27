enum SortDirection{
    Asc = 'asc',
    Desc = 'desc'
}

type QueryValidationResult = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: string
}

export const queryValidationMiddleware = (query: any): QueryValidationResult => {

    // const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    // const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    // let sortBy =  req.query.sortBy ? req.query.sortBy : 'createdAt'
    // let sortDirection =  req.query.sortDirection ? req.query.sortDirection : 'desc'
    // const searchNameTerm = req.query.searchNameTerm?.toString()

    const pageNumber = typeof query.pageNumber === "string" ? Number(query.pageNumber) : 1
    const pageSize = typeof query.pageSize  === "string" ? Number(query.pageSize) : 10
    let sortBy =  typeof query.sortBy  === "string" ? query.sortBy : 'createdAt'
    let sortDirection =  typeof query.sortDirection  === "string" ? query.sortDirection : 'desc'
    const searchNameTerm = typeof query.searchNameTerm === "string" ? query.searchNameTerm?.toString(): ''

    return {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm
    }
}