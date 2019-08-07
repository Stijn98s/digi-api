import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'validateFilterParam', async: false })
export class FilterParamValidator implements ValidatorConstraintInterface {

  validate(els: {}, args: ValidationArguments) {

    return Object.keys(els).every((key, index) => {
      return key.length > 0 && els[key] && els[key].length > 0;
    });
  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    return 'malformed filter param. See swagger spec for correct implementation';
  }

}
