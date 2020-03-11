import DefaultPlatform from '../../src/common/default/index';
import {describe, it, after} from 'mocha';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PLATFORM} from '../../src/common/blockchain.constants';
import {FakeFile} from './__mocks__/mock';
chai.use(chaiAsPromised);

describe('#DefaultService', () => {

    describe('#invoke', () => {
        let defualtService = new DefaultPlatform.service();
        it('1 should return success ', async () => {expect(defualtService.invoke('a', ['a'], 'a', 'a', 'a')).eventually.to.equal('add env variable and restart the api');});

    });
    describe('#query', () => {
        let defualtService = new DefaultPlatform.service();
        it('2 should return success ', async () => {expect(defualtService.query('a', ['a'], 'a', 'a', 'a')).eventually.to.equal('add env variable and restart the api');});

    });
    describe('#deploy', () => {
        let defualtService = new DefaultPlatform.service();
        it('3 should return success ', async () => {expect(defualtService.deploy(FakeFile, 'a', 'a', 'a', 'a')).eventually.to.equal('add env variable and restart the api');});

    });
    describe('#upgrade', () => {
        let defualtService = new DefaultPlatform.service();

        it('4 should return success ', async () => {expect(defualtService.upgrade('a', 'a', 'a', ['a'], 'a')).eventually.to.equal('add env variable and restart the api');});

    });
    describe('#Instantiate', () => {
        let defualtService = new DefaultPlatform.service();

        it('4 should return success ', async () => {expect(defualtService.instantiate('a', 'a', 'a', ['a'], 'a')).eventually.to.equal('add env variable and restart the api');});

    });

}
);
