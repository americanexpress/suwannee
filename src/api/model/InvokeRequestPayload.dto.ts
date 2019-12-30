/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import {ApiModelProperty} from '@nestjs/swagger';

/**
 * Request payload data transfer object
 *
 * @export
 * @class RequestPayloadDto
 */
export class InvokeRequestPayloadDto {
    @ApiModelProperty({required: true})

    public readonly applicationId: string;
    @ApiModelProperty({required: true})

    public readonly applicationContext: string;
    @ApiModelProperty({required: true})

    public readonly identity: string;
    @ApiModelProperty({required: true})

    public readonly functionName: string;
    @ApiModelProperty({required: false, isArray: true, type: 'String'})
    public readonly functionArguments: any[];
    @ApiModelProperty()
    public readonly transientData?: Object;
    @ApiModelProperty()
    public readonly eventName?: string;
    @ApiModelProperty()
    public readonly callBackUrl?: string;

}
