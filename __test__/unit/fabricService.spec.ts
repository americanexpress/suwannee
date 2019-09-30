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
import { FabricService } from '../../src/api/services/fabric/Fabric.service';
import { describe, beforeEach, it } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { MockGateway, MockConfigService } from './__mocks__/mock';
import chai, { expect } from 'chai';

chai.use(chaiAsPromised);

describe('#fabricService', () => {
    let fabricService: FabricService;

    beforeEach(() => {
        fabricService = new FabricService(MockGateway, MockConfigService);
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
            expect(await fabricService.query('a', 'b', 'c', 'd')).to.be.eql(result);
            expect(await fabricService.query('a', 'b', 'c', 'd', ['e'])).to.be.eql(result);
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
            expect(await fabricService.invoke(['bh'], 'b', 'c', 'd', 'jk')).to.be.eql(result);
            MockGateway.getNetwork.reset();
        });
        it('3)Query should reject with error ', async () => {
            MockGateway.connect.rejects('error');
            expect(fabricService.query('a', 'b', 'c', 'd')).to.eventually.be.eql({});
            MockGateway.connect.reset();
        });
        it('4)Query should reject with error ', async () => {
            MockGateway.connect.rejects('error');
            expect(fabricService.invoke(['k'], 'a', 'b', 'c', 'd')).to.eventually.be.eql({});
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
                await fabricService.invoke(['bh'], 'b', 'c', 'd', 'jk');
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
                await fabricService.query('a', 'b', 'c', 'd');
            } catch (e) {
                expect(e).to.be.an.instanceof(Error);
            }

            MockGateway.getNetwork.reset();
        });
    });
});
