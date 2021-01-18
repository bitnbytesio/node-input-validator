import * as str from './str.util';

describe('util:str', () => {
  test('str:camelCaseToSentance', () => {
    expect(str.camelCaseToSentance('postStatus')).toMatch('post status');
  })

  test('str:snakeCaseToSentance', () => {
    expect(str.snakeCaseToSentance('post_status')).toMatch('post status');
  })

  test('str:kebabCaseToSentance', () => {
    expect(str.kebabCaseToSentance('post-status')).toMatch('post status');
  })

  test('str:replaceAll', () => {
    expect(str.replaceAll('user-post-status', '-', '_')).toMatch('user_post_status');
  })

  test('str:trim', () => {
    expect(str.trim(' username ')).toMatch('username');
    expect(str.trim('%username%', '%')).toMatch('username');
  })

  test('str:sizeToBytes', () => {
    expect(str.sizeToBytes('1024b')).toEqual(1024);
    expect(str.sizeToBytes('1024kb')).toEqual(1024 * 1024);
    expect(str.sizeToBytes('1024mb')).toEqual(1024 * 1024 * 1024);
    expect(str.sizeToBytes('1024gb')).toEqual(1024 * 1024 * 1024 * 1024);
  })
});
