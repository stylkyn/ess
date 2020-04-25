export enum SortType {
    Asc,
    Desc,
}

export const sortTypeMap = new Map<SortType, string>([
    [SortType.Asc, 'ascend'], 
    [SortType.Desc, 'descend'], 
 ]);
 
 export const sortTypeMapReverse = new Map<string , SortType>([
     ['ascend', SortType.Asc], 
     ['descend', SortType.Desc], 
  ]);