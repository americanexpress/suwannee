import {genHMAC} from '../../src/helper/genHMAC';
import {describe, it} from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chai, {expect} from 'chai';
chai.use(chaiAsPromised);

describe('#HMAC generation ', () => {
    const Nonce = '7bbff600-2111-11ea-b889-754a45dbb610';
    const TS = 1576616884431;
    const ClientID = '9QJ0JBvfUrCSC6jUJ9ym5XIuTAZu5nD8';
    const ClientSecret = 'UIqvp1APGz6HCgCjF5E6n9xez29zRpri';
    const ResourcePath = '/api/v1/test_path';
    const Host = 'testhost';
    const Port = '8080';
    const HttpMethod = 'POST';
    const Payload = JSON.stringify({event: 'eventPayload', txId: 'txid', block: 123});

    it('1)Should retutn a HMAC ', async () => {
        expect(genHMAC(ClientID, ClientSecret, ResourcePath, Host, Port, HttpMethod, Payload, Nonce, TS)).equals(`ID="9QJ0JBvfUrCSC6jUJ9ym5XIuTAZu5nD8",ts="1576616884431",nonce="7bbff600-2111-11ea-b889-754a45dbb610",bodyhash="iiQljRKcci8ipQyYbk+TvKS5TPutpYfVFAUJHlvQ0G4=",mac="g0dALdr4tqvnWNVMpt9/qe0lfobV2hKESAEMqUnjnFY="`);
    });
    it('2)Should retutn a HMAC and no Nonce and TS provided ', async () => {
        const TestHmac = genHMAC(ClientID, ClientSecret, ResourcePath, Host, Port, HttpMethod, Payload);
        let nonce = TestHmac.split(',');
        expect(nonce[0]).equals(`ID="9QJ0JBvfUrCSC6jUJ9ym5XIuTAZu5nD8"`);
        expect(nonce[1]).not.equals(`ts=null`);
        expect(nonce[2]).not.equals(`nonce=null`);
    });
});
