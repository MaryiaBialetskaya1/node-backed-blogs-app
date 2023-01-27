export const getSort = (sortDirection: string) => {
    return (sortDirection === 'desc') ? -1 : 1;
}
export const getSkippedNumber = (pageNumber: number, pageSize: number) => {
    return ((pageNumber - 1) * (pageSize));
}

export const getPagesCount = (totalCount: number, pageSize: number  ) => {
    return Math.ceil(totalCount / pageSize);
}