export type ValidatorsValueTypes = (value: string) => string | undefined 

export const required: ValidatorsValueTypes = (value) => {
  if (value){
    return undefined;
  }
  return 'Field is Required'
};
export const maxLengthCreator = (max: number): ValidatorsValueTypes => (value) => {
  if (value.length < max) {
    return undefined
  } return `Max length ${max} symbol`
}