/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import {FabricService} from '../../src/Fabric.service';
import {describe, beforeEach, it} from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import {MockGateway} from './__mocks__/mock';
import chai, {expect} from 'chai';
import {ConfigService} from 'nestjs-config';
import {INSTALL_ERROR, INSTANTIATION_ERROR} from '../../src/fabric.constants';
import {UPGRADE_ERROR} from '../../src/fabric.constants';

chai.use(chaiAsPromised);

describe('#fabricService', () => {
    let fabricService: FabricService;

    beforeEach(() => {

        fabricService = new FabricService(MockGateway, new ConfigService({'app.config': {'dlt': {'fabric': {'connectionProfile': '././test.json'}}}}));

    });

    describe('#fabricService', () => {
        it('1)Query should return an array ', async () => {
            MockGateway.getNetwork.resolves({
                getContract: jk => {
                    return new Promise(resolve => {
                        resolve({
                            createTransaction: fg => {
                                return {
                                    evaluate: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    },
                                    submit: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    }
                                };
                            }
                        });
                    });
                }
            });
            const result = ['test'];
            expect(await fabricService.query('a', ['b'], 'c', 'd', 'e')).to.be.eql(result);
            expect(await fabricService.query('a', null, 'c', 'd', 'e')).to.be.eql(result);
            MockGateway.getNetwork.reset();
        });

        it('2)Invoke should return an array ', async () => {
            MockGateway.getNetwork.resolves({
                getContract: jk => {
                    return new Promise(resolve => {
                        resolve({
                            createTransaction: fg => {
                                return {
                                    evaluate: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    },
                                    submit: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    }
                                };
                            }
                        });
                    });
                }
            });
            const result = ['test'];
            expect(await fabricService.invoke('b', ['c'], 'd', 'jk', 'bh')).to.be.eql(result);
            MockGateway.getNetwork.reset();
        });
        it('3)Query should reject with error ', async () => {
            MockGateway.connect.rejects('error');
            expect(fabricService.query('a', ['a'], 'b', 'c', 'd')).to.eventually.be.rejectedWith(Error);
            MockGateway.connect.reset();
        });
        it('4)Query should reject with error ', async () => {
            MockGateway.connect.rejects('error');
            expect(fabricService.invoke('a', ['b'], 'c', 'd', 'k')).to.eventually.be.rejectedWith(Error);
            MockGateway.connect.reset();
        });
        it('5)Invoke should return an Error when proposal response has error ', async () => {
            MockGateway.getNetwork.resolves({
                getContract: jk => {
                    return new Promise(resolve => {
                        resolve({
                            createTransaction: fg => {
                                return {
                                    evaluate: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['Error:']
                                            });
                                        });
                                    },
                                    submit: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['Error:']
                                            });
                                        });
                                    }
                                };
                            }
                        });
                    });
                }
            });
            try {
                await fabricService.invoke('b', ['c'], 'd', 'jk', 'bh');
            } catch (e) {

                expect(e).to.be.an.instanceof(Error);
            }

            MockGateway.getNetwork.reset();
        });

        it('6)Query should return an Error when proposal response has error ', async () => {
            MockGateway.getNetwork.resolves({
                getContract: jk => {
                    return new Promise(resolve => {
                        resolve({
                            createTransaction: fg => {
                                return {
                                    evaluate: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['Error:']
                                            });
                                        });
                                    },
                                    submit: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['Error:']
                                            });
                                        });
                                    }
                                };
                            }
                        });
                    });
                }
            });

            try {
                await fabricService.query('a', ['b'], 'c', 'd', 'e');
            } catch (e) {
                expect(e).to.be.an.instanceof(Error);
            }

            MockGateway.getNetwork.reset();
        });
        it('7)Test event call back ,Query should return an array ', async () => {
            MockGateway.getNetwork.resolves({
                getContract: jk => {
                    return new Promise(resolve => {
                        resolve({
                            createTransaction: fg => {
                                return {
                                    evaluate: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    },
                                    setTransactionOptions: (fake) => {
                                        return fake;
                                    },
                                    submit: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    }
                                };
                            }
                        });
                    });
                }
            });
            const result = ['test'];
            expect(await fabricService.query('b', ['c'], 'd', 'jk', 'bh', {'test': Buffer.from('val')})).to.be.eql(result);

            MockGateway.getNetwork.reset();
        });
        it('8)Test event call back ,invoke should return an array ', async () => {
            MockGateway.getNetwork.resolves({
                getContract: jk => {
                    return new Promise(resolve => {
                        resolve({
                            createTransaction: fg => {
                                return {
                                    evaluate: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    },
                                    setTransactionOptions: (a) => {
                                        a.txnCustomEvent[0].callback(false, {payload: 'd'}, 1, 3);
                                    },
                                    submit: () => {
                                        return new Promise(resolves => {
                                            resolves({
                                                payload: ['test']
                                            });
                                        });
                                    }
                                };
                            }
                        });
                    });
                }
            });
            const result = ['test'];
            expect(await fabricService.invoke('b', ['c'], 'd', 'jk', 'bh', {'test': Buffer.from('val')}, 'TEST_EVENT', 'http://localhost:3000/')).to.be.eql(result);

            MockGateway.getNetwork.reset();
        });
        it('9)Test event call back ,Query and invoke should return an error when an error occured in the event webhook',
            async () => {
                MockGateway.getNetwork.resolves({
                    getContract: jk => {
                        return new Promise(resolve => {
                            resolve({
                                createTransaction: fg => {
                                    return {
                                        evaluate: () => {
                                            return new Promise(resolves => {
                                                resolves({
                                                    payload: ['test']
                                                });
                                            });
                                        },
                                        setTransactionOptions: (a) => {
                                            a.txnCustomEvent[0].callback(true, {payload: 62}, 1, 3);
                                        },
                                        submit: () => {
                                            return new Promise(resolves => {
                                                resolves({
                                                    payload: ['test']
                                                });
                                            });
                                        }
                                    };
                                }
                            });
                        });
                    }
                });
                const result = ['test'];
                expect(await fabricService.invoke('b', ['c'], 'd', 'jk', 'bh', {'test': Buffer.from('val')}, 'TEST_EVENT', 'http://localhost:3000/')).to.be.eql(result);
                MockGateway.getNetwork.reset();
            });
        it('10)Deploy/install a chaincode should be sucessful ', async () => {
            MockGateway.getNetwork.resolves({
                installContract: (a, b, c, d) => {
                    return new Promise(resolve => {
                        resolve({
                            payload: ['success']
                        });
                    });
                }
            });
            const FakeFile: Express.Multer.File = {
                buffer: new Buffer('empty', 'utf-8'),
                fieldname: 'empty.zip',
                filename: 'empty.zip',
                mimetype: 'zip',
                originalname: 'empty.zip',
                encoding: 'utf-8',
                size: 0,
                destination: '',
                path: ''
            };
            const Resp = await fabricService.deploy(FakeFile, 'c', 'd', 'jk', 'bh');
            expect(Resp.payload[0]).to.be.equal('success');
            MockGateway.getNetwork.reset();
        });
        it('11)Upgrade  chaincode should be sucessful ', async () => {
            MockGateway.getNetwork.resolves({
                upgradeContract: (a, b, c, d) => {
                    return new Promise(resolve => {
                        resolve({
                            payload: ['success']
                        });
                    });
                }
            });

            const Resp = await fabricService.upgrade('c', 'd', 'jk', ['bh'], 's');
            expect(Resp.payload[0]).to.be.equal('success');
            MockGateway.getNetwork.reset();
        });
        it('12)Instantiate  chaincode should be sucessful ', async () => {
            MockGateway.getNetwork.resolves({
                instantiateContract: (a, b, c, d) => {
                    return new Promise(resolve => {
                        resolve({
                            payload: ['success']
                        });
                    });
                }
            });

            const Resp = await fabricService.instantiate('c', 'd', 'jk', ['bh'], 's');
            console.log(Resp);
            expect(Resp.payload[0]).to.be.equal('success');
            MockGateway.getNetwork.reset();
        });
        it('13)Deploy/install a chaincode should be failed ', async () => {
            MockGateway.getNetwork.resolves({
                installContract: (a, b, c, d) => {
                    throw 'error';
                }
            });
            const FakeFile: Express.Multer.File = {
                buffer: new Buffer('empty', 'utf-8'),
                fieldname: 'empty.zip',
                filename: 'empty.zip',
                mimetype: 'zip',
                originalname: 'empty.zip',
                encoding: 'utf-8',
                size: 0,
                destination: '',
                path: ''
            };
            const Resp = await fabricService.deploy(FakeFile, 'c', 'd', 'jk', 'bh');
            expect(Resp).to.be.equal(INSTALL_ERROR);
            MockGateway.getNetwork.reset();
        });
        it('14)Instantiate  chaincode should be failed ', async () => {
            MockGateway.getNetwork.resolves({
                instantiateContract: (a, b, c, d) => {
                    throw 'error';
                }
            });

            const Resp = await fabricService.instantiate('c', 'd', 'jk', ['bh'], 's');
            expect(Resp).to.be.equal(INSTANTIATION_ERROR);
            MockGateway.getNetwork.reset();
        });
        it('15)Upgrade  chaincode should be failed ', async () => {
            MockGateway.getNetwork.resolves({
                upgradeContract: (a, b, c, d) => {
                    throw 'error';
                }
            });
            const Resp = await fabricService.upgrade('c', 'd', 'jk', ['bh'], 's');
            expect(Resp).to.be.equal(UPGRADE_ERROR);
            MockGateway.getNetwork.reset();
        });
        it('16)Test event call back ,Query and invoke should return an error when an error occured in the event webhook',
            async () => {
                MockGateway.getNetwork.resolves({
                    getContract: jk => {
                        return new Promise(resolve => {
                            resolve({
                                createTransaction: fg => {
                                    return {
                                        evaluate: () => {
                                            return new Promise(resolves => {
                                                resolves({
                                                    payload: ['test']
                                                });
                                            });
                                        },
                                        setTransactionOptions: (fakeOptions) => {
                                            return fakeOptions;
                                        },
                                        submit: () => {
                                            return new Promise(resolves => {
                                                resolves({
                                                    payload: ['test']
                                                });
                                            });
                                        }
                                    };
                                }
                            });
                        });
                    }
                });
                const result = ['test'];
                expect(await fabricService.invoke('b', ['c'], 'd', 'jk', 'bh', {'test': Buffer.from('val')})).to.be.eql(result);
                MockGateway.getNetwork.reset();
            });
    });
});
