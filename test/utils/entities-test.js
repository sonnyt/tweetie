import { assert } from 'chai';
import entities from '../../src/utils/entities';

describe('entities utility', () => {
  it('renders a user',() => {
    assert.equal(entities('Hi @first', {}), 'Hi <a href="https://twitter.com/first" target="_blank">@first</a>');
    assert.equal(entities('Hi @first, @second', {}), 'Hi <a href="https://twitter.com/first" target="_blank">@first</a>, <a href="https://twitter.com/second" target="_blank">@second</a>');
  });

  it('renders an URL',() => {
    const urls = [
      {
        url: 'https://first.com',
        expanded_url: 'https://www.first.com',
        display_url: 'first.com'
      },
      {
        url: 'https://second.com',
        expanded_url: 'https://www.second.com',
        display_url: 'second.com'
      },
      {
        url: 'https://third.com',
        expanded_url: 'https://www.third.com',
        display_url: 'third.com'
      }
    ];

    assert.equal(entities('Hi https://first.com', { urls }), 'Hi <a href="https://www.first.com" target="_blank">first.com</a>');
    assert.equal(entities('Hi https://second.com, https://third.com', { urls }), 'Hi <a href="https://www.second.com" target="_blank">second.com</a>, <a href="https://www.third.com" target="_blank">third.com</a>');
  });

  it('replaces a hashtag',() => {
    const hashtags = [
      { text: 'first' },
      { text: 'second' },
      { text: 'third' }
    ];

    assert.equal(entities('Hi #first', { hashtags }), 'Hi <a href="https://twitter.com/hashtag/first?src=hash" target="_blank">#first</a>');
    assert.equal(entities('Hi #second, #third', { hashtags }), `Hi <a href="https://twitter.com/hashtag/second?src=hash" target="_blank">#second</a>, <a href="https://twitter.com/hashtag/third?src=hash" target="_blank">#third</a>`);
  });
});
