import * as date from './date';
import entities from './entities';

function getProperty(obj = {}, key = '') {
  const props = key.replace(/\[(\w+)\]/g, '.$1').split('.');
  let val = obj[props[0]];

  props.slice(1).every((prop) => {
    val = val.hasOwnProperty(prop) ? val[prop] : null; 
    return !!val;
  });

  return val;
}

export default function(tweet, template, dateFormat) {
  tweet.text = template.replace(/{{tweet\.(.*?)}}/gi, (variable, key) => {
    let value = getProperty(tweet, key);

    if (date.isDate(key)) {
      value = date.format(value, dateFormat);
    }

    return value;
  });

  tweet.text = entities(tweet.text, tweet.entities);

  return tweet.text;
}
