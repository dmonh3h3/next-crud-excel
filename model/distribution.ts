import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

type Types = {
  where: Object,
  offset: number,
  limit: number,
  orderBy: object
}

const Distribution_Model = {
  master: {
    getALl: async (where?: any) => {
      const data = await Prisma.distribution_master.findMany({
        where: {
          deleted_at: null,
          ...where
        }
      })

      return data
    },
    getById: async (id: any) => {
      const data = await Prisma.distribution_master.findFirst({
        where: {
          deleted_at: null,
          id: id
        }
      })

      return data
    },
    search: async (search: any) => {
      const data = await Prisma.distribution_master.findMany({
        where: {
          deleted_at: null,
          name: {
            search: search
          },
          code: {
            search: search
          },
          description: {
            search: search
          },
          contact: {
            search: search
          }
        }
      })
      return data
    },
    update: async ({ data, id }: { data: any, id: any }) => {
      const updated = await Prisma.distribution_master.update({
        data: data,
        where: {
          id: id
        }
      })

      return updated
    },
    add: async (data: any) => {
      try {
        const create: any = await Prisma.distribution_master.create({
          data: data
        })

        return create ?? null
      } catch (error) {
        console.log("🚀 ~ add: ~ error:", error)
      }
    }
  },
  list: {
    getAll: async () => {
      const data = await Prisma.distribution.findMany({
        take: 10
      })

      const toptreeCustomer = await Prisma.distribution.groupBy({
        by: ['customer'],
        take: 3,
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'asc',
          },
        }
      })

      const total = await Prisma.distribution.count()



      return {
        list: data ?? [],
        total: total,
        top: {
          customer: toptreeCustomer
        }
      }
    }
  }
}

export default Distribution_Model