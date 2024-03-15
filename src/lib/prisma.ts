import { Prisma, PrismaClient } from "@prisma/client";
import * as yup from "yup";
import _ from "lodash";
import logger from "./logger";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("error", (event) => {
  logger.error("Prisma Error:", event);
});

prisma.$on("warn", (event) => {
  logger.warn("Prisma Warn:", event);
});

export default prisma.$extends({
  model: {
    $allModels: {
      async getList<T>(
        this: T,
        {
          page = 1,
          size = 10,
          sort,
          dir = "asc",
          search,
          searchFields = [],
          where: customWhere,
          select,
          orderBy: customOrderBy,
          include,
        }: {
          page?: number;
          size?: number;
          sort?: string | null;
          dir?: string | null;
          search?: string | null;
          searchFields?: string[];
          where?: Prisma.Args<T, "findMany">["where"];
          select?: Prisma.Args<T, "findMany">["select"];
          orderBy?: object[];
          include?: Prisma.Args<T, "findMany">["include"];
        },
      ): Promise<{
        data: any[];
        currentPage: number;
        perPage: number;
        from: number;
        to: number;
        lastPage: number;
        total: number;
      }> {
        const context = Prisma.getExtensionContext(this);

        const listPayloadSchema = yup.object({
          page: yup.number(),
          size: yup.number(),
          search: yup.string().notRequired(),
          sort: yup.string().notRequired(),
          dir: yup.string().notRequired().oneOf(["asc", "desc"]),
        });

        await listPayloadSchema.validate(
          {
            page,
            size,
            search,
            sort,
            dir,
          },
          { abortEarly: false },
        );

        let where: any = { AND: [{ OR: [] }] };

        if (customWhere) {
          where.AND.push(customWhere);
        }

        if (search) {
          searchFields.forEach((field) => {
            where.AND[0].OR.push(
              _.set({}, field, {
                contains: search,
                mode: "insensitive",
              }),
            );
          });
        }

        let orderBy: object[] = [];

        if (sort) {
          orderBy.push(_.set({}, sort, dir ?? "asc"));
        }

        if (customOrderBy) {
          orderBy = [...orderBy, ...customOrderBy];
        }

        const skip = (page - 1) * Number(size);
        const take = size;

        try {
          const result = await (context as any).findMany({
            where,
            select,
            orderBy,
            skip,
            take,
            include,
          });

          const total = await (context as any).count({
            where,
          });
          const lastPage = Math.ceil(total / take) || 1;
          const from = result.length ? skip + 1 : 0;
          const to = skip + result.length;

          return {
            data: result,
            currentPage: page,
            perPage: size,
            from,
            to,
            lastPage,
            total,
          };
        } catch (error) {
          return {
            data: [],
            currentPage: 1,
            perPage: 10,
            from: 0,
            to: 0,
            lastPage: 1,
            total: 0,
          };
        }
      },
    },
  },
});
