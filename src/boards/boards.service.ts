import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-dto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // getAllBoards(): Board[] {
  //     return this.boards;
  // }
  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;
  //     const board: Board = {
  //         id: uuid(),
  //         title,
  //         description,
  //         status: BoardStatus.PUBLIC
  //     }
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  //     this.boards.push(board);
  //     return board;
  // }

  // getBoardId(id: string): Board {
  //     return this.boards.find((board) => board.id === id);
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find board id with id ${id}`);
    }

    return found;
  }

  // deleteBoard(id: string): void {
  //     this.boards =  this.boards.filter((board) => board.id !== id);
  // }
  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find with board id ${id}`);
    }

    console.log(result);
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardId(id);
  //     board.status = status;
  //     return board;
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    board.save();

    return board;
  }
}
