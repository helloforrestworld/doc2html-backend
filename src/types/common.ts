export enum EInjectType {
  脚本,
  样式
}

export interface IInject {
  name: string;
  type: EInjectType;
  content: string;
}
