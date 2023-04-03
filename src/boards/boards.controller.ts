import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-dto.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Boards Controller');
  // boardsService 파라미터에 BoardsService 객체를 타입으로 지정
  // 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언 (파라미터 -> 프로퍼티)
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  // }
  @Get('/')
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all board`);
    return this.boardsService.getAllBoards(user);
  }

  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(
  //     @Body() createBoardDto: CreateBoardDto
  //     ): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  // }
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string ): Board {
  //     const found =  this.boardsService.getBoardId(id);

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  //     if (!found) {
  //         throw new NotFoundException(`Can't find board id with id ${id}`);
  //     }

  //     return found;
  // }

  // @Delete('/:id')
  // DeleteBoard(@Param('id') id: string) : void {
  //     const found = this.getBoardById(id);
  //     return this.boardsService.deleteBoard(found.id);
  // }
  @Delete('/:id')
  DeleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus (
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) : Board {
  //     // 오ㅐ return type  정의 안해줘도 타입에러가 안나지?
  //     return this.boardsService.updateBoardStatus(id, status);
  // };
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id,
    @Body('status', BoardStatusValidationPipe) status,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}

// 5시간 43분부터!

/*
잘생긴 제로초님 안녕하세요. 3.비전공/프론트개발자용 네트워크 강좌 주세요!!!! 떨어지면  타입스크립트 책 존버합니당.. 또 떨어지면 nest강좌 주세요... ^_^. 입사 이후로 제로초님 강좌만 보고 있습니당〰〰〰~ (인프런 채고채고)
*/
