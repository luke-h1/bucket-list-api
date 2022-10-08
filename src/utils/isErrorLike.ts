import isObject from 'lodash/isObject';

export default function isErrorLike(value: unknown): value is Error {
  if (!isObject(value)) {
    return false;
  }

  if (value instanceof Error) {
    return true;
  }

  const typedError = value as Error;

  return Boolean(typedError.name && typedError.message);
}
