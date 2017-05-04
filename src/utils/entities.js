function urls(text, entity) {
  return text.replace(entity.url, `<a href="${entity.expanded_url}" target="_blank">${entity.display_url}</a>`);
}

function users(text) {
  return text.replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/$1" target="_blank">@$1</a>');
}

function hashtags(text, entity) {
  const hash = entity.text;
  return text.replace(`#${hash}`, `<a href="https://twitter.com/hashtag/${hash}?src=hash" target="_blank">#${hash}</a>`);
}

export default function(text, entities) {
  if (entities.urls && entities.urls.length) {
    entities.urls.forEach((entity) => text = urls(text, entity));
  }

  if (entities.hashtags && entities.hashtags.length) {
    entities.hashtags.forEach((entity) => text = hashtags(text, entity));
  }

  text = users(text);

  return text;
}
