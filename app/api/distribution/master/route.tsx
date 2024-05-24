'use server'

import Distribution_Model from "@/model/distribution"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id') ?? null
    const search = req.nextUrl.searchParams.get('search') ?? null
    let data = null

    if (id) {
      data = await Distribution_Model.master.getById(id)
    } else if (search) {
      data = await Distribution_Model.master.search(search)
    } else {
      data = await Distribution_Model.master.getALl()
    }

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

export async function POST(req: NextRequest, res: NextResponse) {

  try {
    // const data = await Distribution_Model.master.getALl()
    const request = JSON.parse(await req.text());
    const retrive = await Distribution_Model.master.add(request)

    if (!retrive) {
      return NextResponse.json({
        code: 500,
        message: 'Internal Server Error',
        data: request
      })
    }

    return NextResponse.json({
      code: 200,
      message: 'Success, Data Retrieved',
      data: request
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({
      code: 500,
      message: 'Internal Server Error',
      data: null
    })
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {

  try {
    // const data = await Distribution_Model.master.getALl()
    const request = JSON.parse(await req.text());

    const retrive = await Distribution_Model.master.update({
      id: request.id,
      data: request
    })

    if (!retrive) {
      return NextResponse.json({
        code: 500,
        message: 'Internal Server Error',
        data: request
      })
    }

    return NextResponse.json({
      code: 200,
      message: 'Success, Data Retrieved',
      data: request
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({
      code: 500,
      message: 'Internal Server Error',
      data: null
    })
  }
}
