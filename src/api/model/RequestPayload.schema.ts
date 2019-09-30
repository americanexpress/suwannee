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
import Joi from '@hapi/joi';
//========================================================
// Request payload schema to validate the request input
//=======================================================
export const RequestPayloadSchema: Joi.ObjectSchema = Joi.object({
    applicationId: Joi.string(),
    applicationContext: Joi.string(),
    identity: Joi.string(),
    functionName: Joi.string(),
    functionArguments: Joi.alternatives().try(Joi.array().items(Joi.string()).allow(null, ''), Joi.string().allow('')),
});
