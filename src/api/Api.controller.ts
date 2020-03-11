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
import {Body, Controller, Get, Post, Query, UseFilters, UsePipes, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile} from '@nestjs/swagger';
import {HttpExceptionFilter} from '../filters/HttpExecption.filter';
import {ApiService} from './Api.service';
import {InvokeRequestPayloadDto} from './model/InvokeRequestPayload.dto';
import {JoiValidationPipe} from '../pipe/JoiValidation.pipe';
import {InvokeRequestPayloadSchema, QueryRequestPayloadSchema} from './model/RequestPayload.schema';
import {QUERY_RESPONE, QUERY_PATH, QUERY_API_META_DATA, INVOKE_RESPONE, INVOKE_PATH, INVOKE_API_META_DATA, OK, NON_SUPPORTED_ACTION} from './api.constants';
import {QueryRequestPayloadDto} from './model/QueryRequestPayload.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {FileExtentionFilter} from '../filters/FileExtention.filter';
import {DevopsDto} from './model/Devops.dto';
import {Action} from './model/Action.enum';
/**
 * Class of ApiController
 *
 * @export
 * @class ApiController
 */
@ApiUseTags('api')
@ApiBearerAuth()
@Controller('api')
@UseFilters(new HttpExceptionFilter())
export class ApiController {

    /**
     *Creates an instance of ApiController.
     * @param {ApiService} apiService
     *
     * @memberof ApiController
     */
    constructor (private apiService: ApiService) {}
    @Get()
    public healthCheck(): string {
        return OK;
    }
    /**
     * Query chaincode (Available when platform is set to Fabric)
     * @param {requestPayloadDto} RequestPayloadDto
     * @returns {Promise<any>}
     * @memberof ApiController
     */
    @Get(QUERY_PATH)
    @ApiOperation(QUERY_API_META_DATA)
    @ApiResponse(QUERY_RESPONE)
    @UsePipes(new JoiValidationPipe(QueryRequestPayloadSchema))

    public query(@Query() requestPayloadDto: QueryRequestPayloadDto): Promise<any> {

        return this.apiService.query(
            requestPayloadDto.functionName,
            requestPayloadDto.functionArguments,
            requestPayloadDto.applicationId,
            requestPayloadDto.applicationContext,
            requestPayloadDto.identity
        );
    }

    /**
     * Invoke  chaincode/workflows (can be used to invoke chaincode invoke corda functions and corda workflows)
     * according to the application config setting
     *
     * @param {requestPayloadDto} RequestPayloadDto
     * @returns {Promise<any>}
     * @memberof ApiController
     */
    @Post(INVOKE_PATH)
    @ApiOperation(INVOKE_API_META_DATA)
    @ApiResponse(INVOKE_RESPONE)
    @UsePipes(new JoiValidationPipe(InvokeRequestPayloadSchema))
    public invoke(@Body() requestPayloadDto: InvokeRequestPayloadDto): Promise<any> {
        return this.apiService.invoke(
            requestPayloadDto.functionName,
            requestPayloadDto.functionArguments,
            requestPayloadDto.applicationId,
            requestPayloadDto.applicationContext,
            requestPayloadDto.identity,
            requestPayloadDto.transientData,
            requestPayloadDto.eventName,
            requestPayloadDto.callBackUrl
        );
    }
    @Post('devops')
    @UseInterceptors(FileInterceptor('contract', {fileFilter: FileExtentionFilter}))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'contract', required: false, description: 'upload the contract'})
    async devops(@Body() devops: DevopsDto, @UploadedFile() contract) {
        if (devops.action in Action) {
            return this.apiService.devops(devops, contract);
        }
        throw new Error(NON_SUPPORTED_ACTION);
    }
}
