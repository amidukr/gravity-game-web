export interface UssLocation {
  type: string;
  name: string;
  parent: UssLocation | null;
  attributes: any;
}
