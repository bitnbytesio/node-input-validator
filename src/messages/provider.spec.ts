import { Langs } from '../contracts';
import * as prov from './provider';

describe('messages:provider', () => {
  test('should add custom message in default lang', () => {
    prov.addCustomMessages({
      'name.required': 'Please fill in the name.'
    });

    const mess = prov.messagesRefByLang(Langs.en_US);

    expect(mess.$custom).toMatchObject({
      'name.required': 'Please fill in the name.'
    });
  });

  test('should add custom message in any lang', () => {
    prov.addCustomMessages({
      'name.required': 'ਕਿਰਪਾ ਕਰਕੇ ਨਾਮ ਭਰੋ |'
    }, Langs.pb);

    const mess = prov.messagesRefByLang(Langs.pb);

    expect(mess.$custom).toMatchObject({
      'name.required': 'ਕਿਰਪਾ ਕਰਕੇ ਨਾਮ ਭਰੋ |'
    });
  });

  test('should add nicenames in default lang', () => {
    prov.addNiceNames({
      email: 'e-mail',
      dob: 'date of birth',
    });

    const mess = prov.messagesRefByLang(Langs.en_US);

    expect(mess.$niceNames).toMatchObject({
      email: 'e-mail',
      dob: 'date of birth',
    });
  });

  test('should add nicenames in any lang', () => {
    prov.addNiceNames({
      email: 'e-mail',
      dob: 'date of birth',
    }, Langs.fa);

    const mess = prov.messagesRefByLang(Langs.fa);

    expect(mess.$niceNames).toMatchObject({
      email: 'e-mail',
      dob: 'date of birth',
    });
  });
})
