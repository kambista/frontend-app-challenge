import { Currencies } from "../store/OperationStore";

export function isNullOrUndefined(val: any) {
  return val === null || val === undefined;
}

export function evalNulls(values: Array<any>){
  let isValid = true;
  values.forEach((e) => {
    isValid = isValid && !isNullOrUndefined(e);
  })
  return isValid;
}

export function emptyString(val: string){
  return val === '' || isNullOrUndefined(val);
}

export function evalEmptyStrings(values: Array<any>){
  let isValid = true;
  values.forEach((e) => {
    isValid = isValid && !emptyString(e);
  })
  return isValid;
}

export const currencySymbols = {
  [Currencies.PEN]: 'S/.',
  [Currencies.USD]: '$'
}
