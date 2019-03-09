import { getLocalStore, setLocalStore, escapeRegExp } from './util';

describe('utility', () => {
  it('should store items in localStorage', () => {
    const data = { data: 'atad' };
    setLocalStore('key', data);
    expect(getLocalStore('key')).toMatchObject(data);
  });

  it('should sanitize input', () => {
    const output = escapeRegExp('\'alert(1)');
    expect(output).toEqual('\'alert\\(1\\)');
  });
});