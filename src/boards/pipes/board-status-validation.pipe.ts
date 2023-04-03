import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValue(value)) {
            throw new BadRequestException(`${value} isn't in the status`)
        }
        return value;
    }

    private isStatusValue(status: any) {
        const index = this.StatusOptions.indexOf(status)
        return index !== -1;
    }
}