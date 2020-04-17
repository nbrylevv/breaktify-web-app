function setObject(scope, key, value) {
  const currentScope = getObject(scope);
  const updatedScope = {
    ...currentScope,
    [key]: value
  };

  localStorage.setItem(scope, JSON.stringify(updatedScope));
}

function getObject(scope, key) {
  const lsItem = localStorage.getItem(scope);
  let parsedScope;

  if (!lsItem) {
    return null;
  }

  try {
    parsedScope = JSON.parse(localStorage.getItem(scope))
  } catch (e) {
    return key ? undefined : lsItem;
  }

  return key ? parsedScope[key] : parsedScope;
}

export const lsHelper = {
  set: (key, value) => localStorage.setItem(key, value),
  get: key => localStorage.getItem(key),
  setObject,
  getObject,
  clear: localStorage.clear,
};
