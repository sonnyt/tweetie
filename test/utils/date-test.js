import { assert } from 'chai';
import * as date from '../../src/utils/date';

describe('date utility', () => {
  it('checks for date', () => {
    assert.ok(date.isDate('created_at'));
    assert.notOk(date.isDate('created_date'));
  });

  it('formats date', () => {
    const mock = 'Wed Apr 26 17:27:09 +0000 2017';

    assert.equal(date.format(mock, '%m/%d/%y'), '4/26/17');
    assert.equal(date.format(mock, '%m/%d/%Y'), '4/26/2017');
    assert.equal(date.format(mock, '%b %d, %Y'), 'Apr 26, 2017');
    assert.equal(date.format(mock, '%B %d, %Y'), 'April 26, 2017');
  });
});
