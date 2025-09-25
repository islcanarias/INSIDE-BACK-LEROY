export interface WhereCondition {
    clause: string;
    value?: any;           // valor único
    values?: any[];        // varios valores si hay varios ?
    joinWith?: 'AND' | 'OR'; // cómo unir con la siguiente condición (default AND)
}

export function buildWhereClause(conditions: WhereCondition[]): { where: string; params: any[] } {
    const clauses: string[] = [];
    const params: any[] = [];

    conditions.forEach((cond, index) => {
        if (cond.value !== undefined || (cond.values && cond.values.length)) {
            clauses.push(cond.clause);
            if (cond.values?.length) params.push(...cond.values);
            else params.push(cond.value);
        }
    });

    if (!clauses.length) return { where: '', params: [] };

    const where = clauses
        .map((c, i) => {
            const join = i < clauses.length - 1 ? ` ${conditions[i].joinWith ?? 'AND'} ` : '';
            return c + join;
        })
        .join('');

    return { where: 'WHERE ' + where, params };
}

export interface PaginatedQueryOptions {
    select: string;
    from: string;
    conditions?: WhereCondition[];
    orderFields?: Record<string, string>;
    orderBy?: string;
    orderDir?: string;
    page?: number;
    pageSize?: number;
}

export interface PaginatedResponseDto<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export async function runPaginatedQuery<T>(
    db_helper: any,
    core_db: any,
    options: PaginatedQueryOptions
): Promise<PaginatedResponseDto<T>> {
    const {
        select,
        from,
        conditions = [],
        orderFields = {},
        orderBy,
        orderDir,
        page = 1,
        pageSize = 10,
    } = options;

    const { where, params } = buildWhereClause(conditions);
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    const orderField = orderBy && orderFields[orderBy]
        ? orderFields[orderBy]
        : Object.values(orderFields)[0] || select.split(',')[0].trim();

    const direction = orderDir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const sql = `
        SELECT ${select}
        ${from}
        ${where}
        ORDER BY ${orderField} ${direction}
        LIMIT ? OFFSET ?
    `;

    const data = await db_helper.select(core_db, sql, [...params, limit, offset]);

    const countSql = `
        SELECT COUNT(*) as total
        ${from}
        ${where}
    `;
    const totalResult = await db_helper.select(core_db, countSql, params);
    const total = totalResult?.[0]?.total ?? 0;

    return { items: data ?? [], total, page, pageSize };
}
