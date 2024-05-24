'use server'

import Distribution_Model from "@/model/distribution"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"




export async function GET(req: NextRequest, res: NextResponse) {

  try {

    const data = await Distribution_Model.list.getAll()


    return NextResponse.json({
      code: 200,
      message: 'Success, Data Retrieved',
      data: data
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: 'Internal Server Error',
      data: null
    })
  }
}