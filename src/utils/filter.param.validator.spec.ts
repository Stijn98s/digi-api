import { FilterParamValidator } from './FilterParamValidator';

describe('filterparamvalidator', () => {

  const filter: FilterParamValidator = new FilterParamValidator();

  it('default message', () => {
    expect(filter.defaultMessage(null)).toEqual('malformed filter param. See swagger spec for correct implementation');
  });

  it('should fail with incorrect input', () => {
    expect(filter.validate([{}], null)).toBeFalsy();
  });

  it('should pass with correct input', () => {
    expect(filter.validate({one : 'value', two: 'secondValue'}, null)).toBeTruthy();
  });
});
