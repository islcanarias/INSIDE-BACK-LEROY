import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { QueryUsuarioDto } from './dto/query-usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async createUsuario(createUsuarioDto: CreateUsuarioDto) {
        return await this.usuarioRepository.createUsuario(createUsuarioDto);
    }

    async findAllUsuario(query: QueryUsuarioDto) {
        return await this.usuarioRepository.findAllUsuario(query);
    }

    async findOneUsuario(id: number) {
        return await this.usuarioRepository.findOneUsuario(id);
    }

    async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        return await this.usuarioRepository.updateUsuario(id, updateUsuarioDto);
    }

    async removeUsuario(id: number) {
        return await this.usuarioRepository.removeUsuario(id);
    }
}
