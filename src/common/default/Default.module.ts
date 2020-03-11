import {Module} from '@nestjs/common';
import {DefaultService} from './Default.service';
@Module({

    exports: [DefaultService],
    providers: [

        DefaultService
    ],
})
export class DefaultModule {}
