import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(@InjectRepository(Coffee) private readonly coffeRepository: Repository<Coffee>) { }

    findAll(): Promise<Coffee[]> {
        return this.coffeRepository.find();
    }

    async findOne(id: string): Promise<Coffee> {
        const coffee = await this.coffeRepository.findOne(id)

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`)
        }

        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeRepository.create(createCoffeeDto)
        return this.coffeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: any) {
        const coffee = await this.coffeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
        });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeRepository.save(coffee)
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeRepository.remove(coffee);
    }
}