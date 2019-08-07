import { DateDto } from './date.dto';

describe('filterparamvalidator', () => {

  const date: DateDto = new DateDto();


  it('should produce date object', function() {

    date.date = "2019-06-18T12:18:00.385Z";
   const dateObj = date.dateObject;
    expect(dateObj.getTime()).toEqual(1560860280385);
  });

});
