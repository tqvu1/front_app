declare namespace App {
  import { OptionCoreData } from 'rc-select/lib/interface';
  import { TFunction } from 'i18next';
  import { ColumnsType } from 'antd/es/table';
  import { IRouter } from 'src/interfaces/route';

  export interface Pagination {
    current: number;
    total: number;
  }

  export interface RequestParams {
    page?: number;
    limit?: number;
    include?: string;
  }

  export interface Error {}

  export type ColumnsFnc<T> = (t: TFunction) => ColumnsType<T>;

  export type OptionsFnc = (
    t: TFunction,
  ) => (OptionCoreData & { [prop: string]: any })[];

  export type RouteFnc = (t: TFunction) => IRouter[];

  export type TQuery<T = any> = [string, T];
}
