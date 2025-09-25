import { Inject, Injectable } from "@nestjs/common";
import * as mariadb from 'mariadb';
import { MariaDbService } from "../../database/mariadb/mariadb.service";
import { CreateAcarreoDto } from "./dto/acarreo/create-acarreo.dto";
import { OkPacket } from "src/interfaces/auth.interfaces";
import { UpdateAcarreoDto } from "./dto/acarreo/update-acarreo.dto";
import { CreateClienteDto } from "./dto/cliente/create-cliente.dto";
import { UpdateClienteDto } from "./dto/cliente/update-cliente.dto";
import { CreateIEDto } from "./dto/ie/create-ie.dto";
import { UpdateIEDto } from "./dto/ie/update-ie.dto";
import { CreateTamanioDto } from "./dto/tamanio/create-tamanio.dto";
import { UpdateTamanioDto } from "./dto/tamanio/update-tamanio.dto";
import { CreateConductorDto } from "./dto/conductor/create-conductor.dto";
import { UpdateConductorDto } from "./dto/conductor/update-conductor.dto";
import { CreateMatriculaDto } from "./dto/matricula/create-matricula.dto";
import { UpdateMatriculaDto } from "./dto/matricula/update-matricula.dto";
import { CreatePoblacionDto } from "./dto/poblacion/create-poblacion.dto";
import { UpdatePoblacionDto } from "./dto/poblacion/update-poblacion.dto";
import { CreateOrdenDto } from "./dto/orden/create-orden.dto";
import { UpdateOrdenDto } from "./dto/orden/update-orden.dto";
import { PaginatedAcarreoDto, PaginatedTamanioDto } from "./dto/common/paginated-types";
import { ResponseAcarreoDto } from "./dto/acarreo/response-acarreo.dto";
import { runPaginatedQuery, WhereCondition } from "src/database/mariadb/sql-query-builder";
import { QueryAcarreoDiasDto, QueryAcarreoDto } from "./dto/acarreo/query-acarreo.dto";
import { QueryClienteDto } from "./dto/cliente/query-cliente.dto";
import { QueryIEDto } from "./dto/ie/query-ie.dto";
import { QueryTamanioDto } from "./dto/tamanio/query-tamanio.dto";
import { CreateEstadoDto } from "./dto/estado/create-estado.dto";
import { QueryEstadoDto } from "./dto/estado/query-estado.dto";
import { QueryConductorDto } from "./dto/conductor/query-conductor.dto";
import { QueryMatriculaDto } from "./dto/matricula/query-matricula.dto";
import { QueryPoblacionDto } from "./dto/poblacion/query-poblacion.dto";
import { QueryOrdenDto } from "./dto/orden/query-orden.dto";
import { CreateTamanioLetraDto } from "./dto/tamanio_letra/create-tamanio-letra.dto";
import { QueryTamanioLetraDto } from "./dto/tamanio_letra/query-tamanio-letra.dto";
import { UpdateTamanioLetraDto } from "./dto/tamanio_letra/update-tamanio-letra.dto";
import { CreateTamanioNumDto } from "./dto/tamanio_num/create-tamanio-num.dto";
import { QueryTamanioNumDto } from "./dto/tamanio_num/query-tamanio-num.dto";
import { UpdateTamanioNumDto } from "./dto/tamanio_num/update-tamanio-num.dto";
import { CreateConductorTipoDto } from "./dto/conductor_tipo/create-conductor-tipo.dto";
import { QueryConductorTipoDto } from "./dto/conductor_tipo/query-conductor-tipo.dto";
import { UpdateConductorTipoDto } from "./dto/conductor_tipo/update-conductor-tipo.dto";
import { CreateMatriculaTipoDto } from "./dto/matricula_tipo/create-matricula-tipo.dto";
import { QueryMatriculaTipoDto } from "./dto/matricula_tipo/query-matricula-tipo.dto";
import { UpdateMatriculaTipoDto } from "./dto/matricula_tipo/update-matricula-tipo.dto";
import { CreateIncidenciaTipoDto } from "./dto/incidencia_tipo/create-incidencia-tipo.dto";
import { QueryIncidenciaTipoDto } from "./dto/incidencia_tipo/query-incidencia-tipo.dto";
import { UpdateIncidenciaTipoDto } from "./dto/incidencia_tipo/update-incidencia-tipo.dto";
import { UpdateEstadoDto } from "./dto/estado/update-estado.dto";

@Injectable()
export class VAcarreosRepository {
    constructor(
        @Inject('transporte_db') private readonly transporte_db: mariadb.Pool,
        private readonly db_helper: MariaDbService,
    ) { }

    /**
     **
     **
     **ACARREOS
     **
     **
     **/
    async createAcarreo(body: CreateAcarreoDto): Promise<OkPacket> {
        const {
            id_cliente,
            expediente_transkal,
            fecha,
            hora,
            id_i_e,
            id_tamanio,
            id_estado,
            id_poblacion,
            referencia_facturacion,
            referencia_interna,
            booking,
            contenedor,
            precinto,
        } = body;

        const columns: any[] = [];
        const values: any[] = [];

        // obligatorios
        columns.push('id_cliente'); values.push(id_cliente);
        columns.push('fecha'); values.push(fecha);
        columns.push('hora'); values.push(hora);
        columns.push('id_i_e'); values.push(id_i_e);
        columns.push('id_tamanio'); values.push(id_tamanio);
        columns.push('id_estado'); values.push(id_estado);
        columns.push('id_poblacion'); values.push(id_poblacion);

        // opcionales
        if (expediente_transkal !== undefined) { columns.push('expediente_transkal'); values.push(expediente_transkal); }
        if (referencia_facturacion !== undefined) { columns.push('referencia_facturacion'); values.push(referencia_facturacion); }
        if (referencia_interna !== undefined) { columns.push('referencia_interna'); values.push(referencia_interna); }
        if (booking !== undefined) { columns.push('booking'); values.push(booking); }
        if (contenedor !== undefined) { columns.push('contenedor'); values.push(contenedor); }
        if (precinto !== undefined) { columns.push('precinto'); values.push(precinto); }

        const sql = `
        INSERT INTO v_acarreos (${columns.join(', ')})
        VALUES (${columns.map(() => '?').join(', ')})
    `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllAcarreo(query: QueryAcarreoDto): Promise<InstanceType<typeof PaginatedAcarreoDto>> {
        const {
            expediente_transkal,
            cliente,
            ie,
            tamanio,
            matricula,
            conductor1,
            referencia_facturacion,
            referencia_interna,
            booking,
            contenedor,
            precinto,
            fecha,
            semana,
            mes,
            anio,
            estado,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (estado !== undefined) conditions.push({ clause: 'te.estado LIKE ?', value: `%${estado}%` });
        if (expediente_transkal !== undefined) conditions.push({ clause: 'a.expediente_transkal LIKE ?', value: `%${expediente_transkal}%` });
        if (cliente !== undefined) conditions.push({ clause: 'c.nombre LIKE ?', value: `%${cliente}%` });
        if (ie !== undefined) conditions.push({ clause: 'ie.tipo LIKE ?', value: `%${ie}%` });
        if (precinto !== undefined) conditions.push({ clause: 'a.precinto LIKE ?', value: `%${precinto}%` });
        if (booking !== undefined) conditions.push({ clause: 'a.booking LIKE ?', value: `%${booking}%` });
        if (referencia_facturacion !== undefined) conditions.push({ clause: 'a.referencia_facturacion LIKE ?', value: `%${referencia_facturacion}%` });
        if (referencia_interna !== undefined) conditions.push({ clause: 'a.referencia_interna LIKE ?', value: `%${referencia_interna}%` });
        if (contenedor !== undefined) conditions.push({ clause: 'a.contenedor LIKE ?', value: `%${contenedor}%` });
        if (matricula !== undefined) conditions.push({ clause: 'm.matricula LIKE ?', value: `%${matricula}%` });
        if (conductor1 !== undefined) conditions.push({ clause: 'c1.nombre LIKE ?', value: `%${conductor1}%` });
        if (tamanio !== undefined) {
            conditions.push({
                clause: 'CONCAT(tn.tipo, tl.tipo) LIKE ?',
                value: `%${tamanio}%`
            });
        }

        conditions.push({ clause: 'a.activo = ?', value: 1 });

        if (fecha !== undefined) {
            conditions.push({
                clause: 'a.fecha = ?',
                value: fecha,
            });
        }

        if (semana !== undefined) {
            conditions.push({
                clause: 'WEEK(a.fecha, 1) = ? AND YEAR(a.fecha) = ?',
                values: [semana, anio],
            });
        }

        if (mes !== undefined) {
            conditions.push({
                clause: 'MONTH(a.fecha) = ? AND YEAR(a.fecha) = ?',
                values: [mes, anio],
            });
        }

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                a.id,
                a.expediente_transkal,
                a.fecha,
                a.hora,
                
                te.id AS estado_id,
                te.estado AS estado_nombre,
                te.color AS estado_color,
                
                c.id AS cliente_id,
                c.nombre AS cliente_nombre,
                c.color AS cliente_color,
                
                a.referencia_facturacion,
                a.referencia_interna,
                
                ie.id AS ie_id,
                ie.tipo AS ie_tipo,
                
                t.id AS tamanio_id,
                tn.tipo AS tamanio_num,
                tl.tipo AS tamanio_letra,
                
                m.id AS matricula_id,
                m.matricula AS matricula_valor,
                
                p.id AS poblacion_id,
                p.poblacion,
                p.provincia,
                p.comunidad,
                p.latitud,
                p.longitud,
                p.distanciaValencia,
                
                a.booking,
                a.contenedor,
                a.precinto,
                
                c1.id AS conductor1_id,
                c1.nombre AS conductor1_nombre,
                ct1.id AS conductor1_tipo_id,
                ct1.tipo AS conductor1_tipo_nombre,
                
                c2.id AS conductor2_id,
                c2.nombre AS conductor2_nombre,
                ct2.id AS conductor2_tipo_id,
                ct2.tipo AS conductor2_tipo_nombre,
                
                (SELECT id FROM v_acarreos_tipos_ordenes WHERE id = a.id_oe) AS oe_id,
                (SELECT tipo FROM v_acarreos_tipos_ordenes WHERE id = a.id_oe) AS oe_tipo,
                (SELECT id FROM v_acarreos_tipos_ordenes WHERE id = a.id_oa) AS oa_id,
                (SELECT tipo FROM v_acarreos_tipos_ordenes WHERE id = a.id_oa) AS oa_tipo,
                
                a.lugar,
                a.remolque,
                a.referencia_carga,
                a.observacion,
                
                it.id AS incidencia_tipo_id,
                it.tipo AS incidencia_tipo_nombre,
                
                a.incidencia AS incidencia_detalle
            `,
            from: `
                FROM v_acarreos a
                JOIN v_acarreos_clientes c ON a.id_cliente = c.id
                JOIN v_acarreos_tipos_i_e ie ON a.id_i_e = ie.id
                JOIN v_acarreos_tamanio t ON a.id_tamanio = t.id
                JOIN v_acarreos_tamanio_num tn ON t.id_tamanio_num = tn.id
                JOIN v_acarreos_tamanio_letra tl ON t.id_tamanio_letra = tl.id
                JOIN v_acarreos_estados te ON a.id_estado = te.id
                JOIN v_acarreos_matriculas m ON a.id_matricula = m.id
                JOIN v_acarreos_poblaciones p ON a.id_poblacion = p.id
                JOIN v_acarreos_conductores c1 ON a.id_conductor1 = c1.id
                JOIN v_acarreos_conductores_tipo ct1 ON c1.id_tipo_conductor = ct1.id
                JOIN v_acarreos_conductores c2 ON a.id_conductor2 = c2.id
                JOIN v_acarreos_conductores_tipo ct2 ON c2.id_tipo_conductor = ct2.id
                JOIN v_acarreos_incidencias_tipo it ON a.id_tipo_incidencia = it.id
            `,

            conditions,
            orderFields: {
                id: 'a.id',
                expediente_transkal: 'a.expediente_transkal',
                cliente: 'c.nombre',
                referencia_facturacion: 'a.referencia_facturacion',
                referencia_interna: 'a.referencia_interna',
                ie: 'ie.tipo',
                tamanio_numero: 'tn.tipo',
                tamanio_letra: 'tl.tipo',
                booking: 'a.booking',
                contenedor: 'a.contenedor',
                estado: 'te.estado',
                precinto: 'a.precinto',
                fecha: 'a.fecha',
                matricula: 'm.matricula',
                conductor1: 'c1.nombre',
            },
            orderDir,
            orderBy,
            page,
            pageSize,
        });

    }

    async findAllAcarreoDias(query: QueryAcarreoDiasDto): Promise<String[]> {
        const { mes, anio } = query;

        if (!mes || !anio) throw new Error("Mes y año son requeridos");

        const sql = `
            SELECT DISTINCT DATE_FORMAT(a.fecha, '%Y-%m-%d') AS fecha
            FROM v_acarreos a
            WHERE a.activo = 1
                AND MONTH(a.fecha) = ?
                AND YEAR(a.fecha) = ?
            ORDER BY a.fecha
        `;

        const rows = await this.db_helper.query(this.transporte_db, sql, [mes, anio]);

        if (!rows || !Array.isArray(rows)) return [];

        return rows.map((r: any) => r.fecha);
    }

    async findOneAcarreo(id: number): Promise<ResponseAcarreoDto | null> {
        return null;
    }

    async updateAcarreo(id: number, body: UpdateAcarreoDto): Promise<OkPacket> {
        const {
            expediente_transkal,
            id_cliente,
            id_estado,
            id_i_e,
            id_tamanio,
            referencia_facturacion,
            referencia_interna,
            booking,
            contenedor,
            precinto,
            fecha,
            hora,
            id_conductor1,
            id_conductor2,
            id_matricula,
            id_oa,
            id_oe,
            id_poblacion,
            id_tipo_incidencia,
            incidencia,
            lugar,
            observacion,
            referencia_carga,
            remolque
        } = body;

        const columns: any = [];
        const values: any = [];

        if (expediente_transkal !== undefined) { columns.push('expediente_transkal = ?'); values.push(expediente_transkal) }
        if (id_cliente !== undefined) { columns.push('id_cliente = ?'); values.push(id_cliente) }
        if (id_estado !== undefined) { columns.push('id_estado = ?'); values.push(id_estado) }
        if (id_i_e !== undefined) { columns.push('id_i_e = ?'); values.push(id_i_e) }
        if (id_tamanio !== undefined) { columns.push('id_tamanio = ?'); values.push(id_tamanio) }
        if (referencia_facturacion !== undefined) { columns.push('referencia_facturacion = ?'); values.push(referencia_facturacion) }
        if (referencia_interna !== undefined) { columns.push('referencia_interna = ?'); values.push(referencia_interna) }
        if (booking !== undefined) { columns.push('booking = ?'); values.push(booking) }
        if (contenedor !== undefined) { columns.push('contenedor = ?'); values.push(contenedor) }
        if (precinto !== undefined) { columns.push('precinto = ?'); values.push(precinto) }
        if (fecha !== undefined) { columns.push('fecha = ?'); values.push(fecha) }
        if (hora !== undefined) { columns.push('hora = ?'); values.push(hora) }
        if (id_conductor1 !== undefined) { columns.push('id_conductor1 = ?'); values.push(id_conductor1) }
        if (id_conductor2 !== undefined) { columns.push('id_conductor2 = ?'); values.push(id_conductor2) }
        if (id_matricula !== undefined) { columns.push('id_matricula = ?'); values.push(id_matricula) }
        if (id_oa !== undefined) { columns.push('id_oa = ?'); values.push(id_oa) }
        if (id_oe !== undefined) { columns.push('id_oe = ?'); values.push(id_oe) }
        if (id_poblacion !== undefined) { columns.push('id_poblacion = ?'); values.push(id_poblacion) }
        if (id_tipo_incidencia !== undefined) { columns.push('id_tipo_incidencia = ?'); values.push(id_tipo_incidencia) }
        if (incidencia !== undefined) { columns.push('incidencia = ?'); values.push(incidencia) }
        if (lugar !== undefined) { columns.push('lugar = ?'); values.push(lugar) }
        if (observacion !== undefined) { columns.push('observacion = ?'); values.push(observacion) }
        if (referencia_carga !== undefined) { columns.push('referencia_carga = ?'); values.push(referencia_carga) }
        if (remolque !== undefined) { columns.push('remolque = ?'); values.push(remolque) }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
            UPDATE v_acarreos
            SET ${columns.join(', ')}
            WHERE id = ?
        `;

        values.push(id);

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            values
        );
    }

    async removeAcarreo(id: number): Promise<OkPacket> {
        const sql = `
            UPDATE v_acarreos
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **CLIENTE
     **
     **
     **/
    async createCliente(createClienteDto: CreateClienteDto): Promise<OkPacket> {
        const { nombre, color } = createClienteDto;

        const columns: any = [];
        const values: any = [];

        columns.push('nombre'); values.push(nombre);
        if (color !== undefined) { columns.push('color'); values.push(color); }

        const sql = `
            INSERT INTO v_acarreos_clientes (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllCliente(query: QueryClienteDto) {
        const {
            nombre,
            activo,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (nombre) conditions.push({ clause: 'c.nombre LIKE ?', value: `%${nombre}%` });
        if (activo !== undefined) conditions.push({ clause: 'c.activo = ?', value: activo });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                c.id,
                c.nombre,
                c.activo
            `,
            from: `
                FROM v_acarreos_clientes c
            `,
            conditions,
            orderFields: {
                id: 'c.id',
                nombre: 'c.nombre',
                activo: 'c.activo',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });
    }

    async findOneCliente(id: number) {
        return `This action returns a #${id} cliente`;
    }

    async updateCliente(id: number, updateClienteDto: UpdateClienteDto): Promise<OkPacket> {
        const {
            nombre,
            color
        } = updateClienteDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (nombre !== undefined) { columns.push('nombre = ?'); values.push(nombre); }
        if (color !== undefined) { columns.push('color = ?'); values.push(color); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_clientes
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }


    async removeCliente(id: number) {
        const sql = `
            UPDATE v_acarreos_clientes
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **IE
     **
     **
     **/
    async createIE(createIEDto: CreateIEDto): Promise<OkPacket> {
        const { tipo } = createIEDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);

        const sql = `
            INSERT INTO v_acarreos_tipos_i_e (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }
    async findAllIE(query: QueryIEDto) {
        const {
            tipo,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (tipo) conditions.push({ clause: 'ie.tipo LIKE ?', value: `%${tipo}%` });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                ie.id,
                ie.tipo
            `,
            from: `
                FROM v_acarreos_tipos_i_e ie
            `,
            conditions,
            orderFields: {
                id: 'ie.id',
                tipo: 'ie.tipo',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });
    }

    async findOneIE(id: number) {
        return `This action returns a #${id} IE`;
    }

    async updateIE(id: number, updateIEDto: UpdateIEDto) {
        const {
            tipo
        } = updateIEDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_tipos_i_e
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeIE(id: number) {
        const sql = `
            UPDATE v_acarreos_tipos_i_e
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **ESTADO
     **
     **
     **/
    async createEstado(createEstadoDto: CreateEstadoDto): Promise<OkPacket> {
        const { nombre, color } = createEstadoDto;

        const columns: any = [];
        const values: any = [];

        columns.push('nombre'); values.push(nombre);
        if (color !== undefined) { columns.push('color'); values.push(color); }

        const sql = `
            INSERT INTO v_acarreos_estados (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllEstado(query: QueryEstadoDto) {
        const {
            estado,
            color,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (estado) conditions.push({ clause: 'e.estado LIKE ?', value: `%${estado}%` });
        if (color) conditions.push({ clause: 'e.color LIKE ?', value: `%${color}%` });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                e.id,
                e.estado,
                e.color
            `,
            from: `
                FROM v_acarreos_estados e
            `,
            conditions,
            orderFields: {
                id: 'e.id',
                estado: 'e.estado',
                color: 'e.color',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });
    }

    async findOneEstado(id: number) {
        return `This action returns a #${id} estado`;
    }

    async updateEstado(id: number, updateEstadoDto: UpdateEstadoDto) {
        const {
            nombre,
            color
        } = updateEstadoDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (nombre !== undefined) { columns.push('nombre = ?'); values.push(nombre); }
        if (color !== undefined) { columns.push('color = ?'); values.push(color); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_estados
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeEstado(id: number) {
        const sql = `
            UPDATE v_acarreos_estados
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **TAMAÑO
     **
     **
     **/
    async createTamanio(createTamanioDto: CreateTamanioDto): Promise<OkPacket> {
        const { id_tamanio_letra, id_tamanio_num } = createTamanioDto;

        const columns: any = [];
        const values: any = [];

        columns.push('id_tamanio_letra'); values.push(id_tamanio_letra);
        columns.push('id_tamanio_num'); values.push(id_tamanio_num);

        const sql = `
            INSERT INTO v_acarreos_tamanio (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllTamanio(query: QueryTamanioDto): Promise<InstanceType<typeof PaginatedTamanioDto>> {
        const { tamanio, orderBy, orderDir, page = 1, pageSize = 10 } = query;

        const conditions: WhereCondition[] = [];

        if (tamanio) {
            conditions.push({
                clause: '(tn.tipo LIKE ? OR tl.tipo LIKE ? OR CONCAT(tn.tipo, tl.tipo) LIKE ?)',
                values: [`%${tamanio}%`, `%${tamanio}%`, `%${tamanio}%`]
            });
        }

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
            t.id,
            tn.tipo AS tamanio_num,
            tl.tipo AS tamanio_letra,
            CONCAT(tn.tipo, tl.tipo) AS tamanio
        `,
            from: `
            FROM v_acarreos_tamanio t
            JOIN v_acarreos_tamanio_num tn ON t.id_tamanio_num = tn.id
            JOIN v_acarreos_tamanio_letra tl ON t.id_tamanio_letra = tl.id
        `,
            conditions,
            orderFields: {
                id: 't.id',
                tamanio_num: 'tn.tipo',
                tamanio_letra: 'tl.tipo',
                tamanio: 'CONCAT(tn.tipo, tl.tipo)',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });
    }

    async findOneTamanio(id: number) {
        return `This action returns a #${id} tamaño`;
    }

    async updateTamanio(id: number, updateTamanioDto: UpdateTamanioDto) {
        const {
            id_tamanio_letra,
            id_tamanio_num
        } = updateTamanioDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (id_tamanio_letra !== undefined) { columns.push('id_tamanio_letra = ?'); values.push(id_tamanio_letra); }
        if (id_tamanio_num !== undefined) { columns.push('id_tamanio_num = ?'); values.push(id_tamanio_num); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_tamanio
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeTamanio(id: number) {
        const sql = `
            UPDATE v_acarreos_tamanio
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **TAMAÑO LETRA
     **
     **
     **/
    async createTamanioLetra(createTamanioLetraDto: CreateTamanioLetraDto): Promise<OkPacket> {
        const { tipo } = createTamanioLetraDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);
        const sql = `
            INSERT INTO v_acarreos_tamanio_letra (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllTamanioLetra(query: QueryTamanioLetraDto) {
    }

    async findOneTamanioLetra(id: number) {
        return `This action returns a #${id} tamaño`;
    }

    async updateTamanioLetra(id: number, updateTamanioLetraDto: UpdateTamanioLetraDto) {
        const {
            tipo
        } = updateTamanioLetraDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_tamanio_letra
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeTamanioLetra(id: number) {
        const sql = `
            UPDATE v_acarreos_tamanio_letra
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **TAMAÑO NUM
     **
     **
     **/
    async createTamanioNum(createTamanioNumDto: CreateTamanioNumDto): Promise<OkPacket> {
        const { tipo } = createTamanioNumDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);
        const sql = `
            INSERT INTO v_acarreos_tamanio_num (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllTamanioNum(query: QueryTamanioNumDto) {
    }

    async findOneTamanioNum(id: number) {
        return `This action returns a #${id} tamaño`;
    }

    async updateTamanioNum(id: number, updateTamanioNumDto: UpdateTamanioNumDto) {
        const {
            tipo
        } = updateTamanioNumDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_tamanio_num
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeTamanioNum(id: number) {
        const sql = `
            UPDATE v_acarreos_tamanio_num
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **CONDUCTORES
     **
     **
     **/
    async createConductor(createConductorDto: CreateConductorDto): Promise<OkPacket> {
        const {
            nombre,
            id_tipo_conductor
        } = createConductorDto;

        const columns: any = [];
        const values: any = [];

        columns.push('nombre'); values.push(nombre);
        columns.push('id_tipo_conductor'); values.push(id_tipo_conductor);

        const sql = `
            INSERT INTO v_acarreos_conductores (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllConductor(query: QueryConductorDto) {
        const {
            activo,
            nombre,
            id_tipo_conductor,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (nombre) conditions.push({ clause: 'c.nombre LIKE ?', value: `%${nombre}%` });
        if (id_tipo_conductor) conditions.push({ clause: 'c.id_tipo_conductor LIKE ?', value: `%${id_tipo_conductor}%` });
        if (activo !== undefined) conditions.push({ clause: 'c.activo = ?', value: activo });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                c.id,
                c.nombre,
                c.id_tipo_conductor,
                c.activo
            `,
            from: `
                FROM v_acarreos_conductores c
            `,
            conditions,
            orderFields: {
                id: 'c.id',
                nombre: 'c.nombre',
                id_tipo_conductor: 'c.id_tipo_conductor',
                activo: 'c.activo',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });
    }

    async findOneConductor(id: number) {
        return `This action returns a #${id} conductor`;
    }

    async updateConductor(id: number, updateConductorDto: UpdateConductorDto) {
        const {
            nombre,
            id_tipo_conductor
        } = updateConductorDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (nombre !== undefined) { columns.push('nombre = ?'); values.push(nombre); }
        if (id_tipo_conductor !== undefined) { columns.push('id_tipo_conductor = ?'); values.push(id_tipo_conductor); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_conductores
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeConductor(id: number) {
        const sql = `
            UPDATE v_acarreos_conductores
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **TIPO CONDUCTORES
     **
     **
     **/
    async createTipoConductor(createConductorTipoDto: CreateConductorTipoDto): Promise<OkPacket> {
        const { tipo } = createConductorTipoDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);

        const sql = `
            INSERT INTO v_acarreos_conductores_tipo (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllTipoConductor(query: QueryConductorTipoDto) {
    }

    async findOneTipoConductor(id: number) {
        return `This action returns a #${id} conductor`;
    }

    async updateTipoConductor(id: number, updateConductorTipoDto: UpdateConductorTipoDto) {
        const {
            tipo
        } = updateConductorTipoDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_conductores_tipo
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeTipoConductor(id: number) {
        const sql = `
            UPDATE v_acarreos_conductores_tipo
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **MATRICULAS
     **
     **
     **/
    async createMatricula(createMatriculaDto: CreateMatriculaDto): Promise<OkPacket> {
        const { matricula, id_tipo_matricula } = createMatriculaDto;

        const columns: any = [];
        const values: any = [];

        columns.push('matricula'); values.push(matricula);
        columns.push('id_tipo_matricula'); values.push(id_tipo_matricula);

        const sql = `
            INSERT INTO v_acarreos_matriculas (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllMatricula(query: QueryMatriculaDto) {
        const {
            activo,
            matricula,
            tipo,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (matricula) conditions.push({ clause: 'm.matricula LIKE ?', value: `%${matricula}%` });
        if (activo !== undefined) conditions.push({ clause: 'm.activo = ?', value: activo });
        if (tipo !== undefined) conditions.push({ clause: 'm.tipo = ?', value: tipo });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                m.id,
                m.matricula,
                m.id_tipo_matricula,
                m.activo
            `,
            from: `
                FROM v_acarreos_matriculas m
            `,
            conditions,
            orderFields: {
                id: 'm.id',
                matricula: 'm.matricula',
                tipo: 'm.id_tipo_matricula',
                activo: 'm.activo',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });

    }

    async findOneMatricula(id: number) {
        return `This action returns a #${id} matricula`;
    }

    async updateMatricula(id: number, updateMatriculaDto: UpdateMatriculaDto) {
        const {
            matricula,
            id_tipo_matricula
        } = updateMatriculaDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (matricula !== undefined) { columns.push('matricula = ?'); values.push(matricula); }
        if (id_tipo_matricula !== undefined) { columns.push('id_tipo_matricula = ?'); values.push(id_tipo_matricula); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_matriculas
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeMatricula(id: number) {
        const sql = `
            UPDATE v_acarreos_matriculas
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **TIPO MATRICULA
     **
     **
     **/
    async createTipoMatricula(createMatriculaTipoDto: CreateMatriculaTipoDto): Promise<OkPacket> {
        const { tipo } = createMatriculaTipoDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);

        const sql = `
            INSERT INTO v_acarreos_matriculas_tipo (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllTipoMatricula(query: QueryMatriculaTipoDto) {
    }

    async findOneTipoMatricula(id: number) {
        return `This action returns a #${id} matricula`;
    }

    async updateTipoMatricula(id: number, updateMatriculaTipoDto: UpdateMatriculaTipoDto) {
        const {
            tipo
        } = updateMatriculaTipoDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_matriculas_tipo
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeTipoMatricula(id: number) {
        const sql = `
            UPDATE v_acarreos_matriculas_tipo
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **POBLACION
     **
     **
     **/
    async createPoblacion(createPoblacionDto: CreatePoblacionDto): Promise<OkPacket> {
        const { poblacion, provincia, comunidad, latitud, longitud, distanciaValencia } = createPoblacionDto;

        const columns: any = [];
        const values: any = [];

        columns.push('poblacion'); values.push(poblacion);
        columns.push('provincia'); values.push(provincia);
        columns.push('comunidad'); values.push(comunidad);
        columns.push('latitud'); values.push(latitud);
        columns.push('longitud'); values.push(longitud);
        columns.push('distanciaValencia'); values.push(distanciaValencia);

        const sql = `
            INSERT INTO v_acarreos_poblaciones (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllPoblacion(query: QueryPoblacionDto) {
        const {
            poblacion,
            provincia,
            comunidad,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (poblacion) conditions.push({ clause: 'p.poblacion LIKE ?', value: `%${poblacion}%` });
        if (provincia) conditions.push({ clause: 'p.provincia LIKE ?', value: `%${provincia}%` });
        if (comunidad) conditions.push({ clause: 'p.comunidad LIKE ?', value: `%${comunidad}%` });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                p.id,
                p.poblacion,
                p.provincia,
                p.comunidad,
                p.latitud,
                p.longitud,
                p.distanciaValencia
            `,
            from: `
                FROM v_acarreos_poblaciones p
            `,
            conditions,
            orderFields: {
                id: 'p.id',
                poblacion: 'p.poblacion',
                provincia: 'p.provincia',
                comunidad: 'p.comunidad',
                latitud: 'p.latitud',
                longitud: 'p.longitud',
                distanciaValencia: 'p.distanciaValencia',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });

    }

    async findOnePoblacion(id: number) {
        return `This action returns a #${id} poblacion`;
    }

    async updatePoblacion(id: number, updatePoblacionDto: UpdatePoblacionDto) {
        return `This action updates a #${id} poblacion`;
    }

    async removePoblacion(id: number) {
        return `This action removes a #${id} poblacion`;
    }

    /**
     **
     **
     **ORDENES
     **
     **
     **/
    async createOrden(createOrdenDto: CreateOrdenDto): Promise<OkPacket> {
        const { tipo } = createOrdenDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);

        const sql = `
            INSERT INTO v_acarreos_tipos_ordenes (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllOrden(query: QueryOrdenDto) {
        const {
            activo,
            tipo,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (tipo !== undefined) conditions.push({ clause: 't.tipo LIKE ?', value: `%${tipo}%` });
        if (activo !== undefined) conditions.push({ clause: 't.activo = ?', value: activo });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                t.id,
                t.tipo,
                t.activo
            `,
            from: `
                FROM v_acarreos_tipos_ordenes t
            `,
            conditions,
            orderFields: {
                id: 't.id',
                tipo: 't.tipo',
                activo: 't.activo',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });

    }

    async findOneOrden(id: number) {
        return `This action returns a #${id} orden`;
    }

    async updateOrden(id: number, updateOrdenDto: UpdateOrdenDto) {
        const {
            tipo
        } = updateOrdenDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_tipos_ordenes
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeOrden(id: number) {
        const sql = `
            UPDATE v_acarreos_tipos_ordenes
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

    /**
     **
     **
     **TIPO INCIDENCIAS
     **
     **
     **/
    async createTipoIncidencia(createIncidenciaTipoDto: CreateIncidenciaTipoDto): Promise<OkPacket> {
        const { tipo } = createIncidenciaTipoDto;

        const columns: any = [];
        const values: any = [];

        columns.push('tipo'); values.push(tipo);

        const sql = `
            INSERT INTO v_acarreos_incidencias_tipo (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
        `;

        return await this.db_helper.insert(this.transporte_db, sql, values);
    }

    async findAllTipoIncidencia(query: QueryIncidenciaTipoDto) {

        const {
            tipo,
            orderBy,
            orderDir,
            page = 1,
            pageSize = 10,
        } = query;

        const conditions: WhereCondition[] = [];

        if (tipo !== undefined) conditions.push({ clause: 't.tipo LIKE ?', value: `%${tipo}%` });

        return await runPaginatedQuery(this.db_helper, this.transporte_db, {
            select: `
                t.id,
                t.tipo,
                t.activo
            `,
            from: `
                FROM v_acarreos_incidencias_tipo t
            `,
            conditions,
            orderFields: {
                id: 't.id',
                tipo: 't.tipo',
                activo: 't.activo',
            },
            orderBy,
            orderDir,
            page,
            pageSize,
        });
    }

    async findOneTipoIncidencia(id: number) {
        return `This action returns a #${id} orden`;
    }

    async updateTipoIncidencia(id: number, updateIncidenciaTipoDto: UpdateIncidenciaTipoDto) {
        const {
            tipo
        } = updateIncidenciaTipoDto;

        const columns: any[] = [];
        const values: any[] = [];

        if (tipo !== undefined) { columns.push('tipo = ?'); values.push(tipo); }

        if (columns.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE v_acarreos_incidencias_tipo
        SET ${columns.join(', ')}
        WHERE id = ?
    `;

        values.push(id);

        return await this.db_helper.update(this.transporte_db, sql, values);
    }

    async removeTipoIncidencia(id: number) {
        const sql = `
            UPDATE v_acarreos_incidencias_tipo
            SET deleted_at = NOW(),
            activo = 0
            WHERE id = ? AND activo = 1
        `;

        return await this.db_helper.update(
            this.transporte_db,
            sql,
            [id]
        );
    }

}