import { FilterParamValidator } from './FilterParamValidator';
import { extractFilterVals, extractIncludeVals } from './stringManipulators';

describe('select filter validator', () => {



  it('to extract include values', () => {
    expect(extractIncludeVals('one,two,three')).toEqual(['one','two', 'three']);
  });

  it('to extract include values empty entry', () => {
    expect(extractIncludeVals(null)).toEqual([]);
  });

  it('to extract filter values', () => {
    expect(extractFilterVals('one:two,two:three,three:foure')).toEqual({one: "two", two:"three", three: 'foure'});
  });
  it('to extract filter values', () => {
    expect(extractFilterVals(null)).toEqual({});
  });

});
