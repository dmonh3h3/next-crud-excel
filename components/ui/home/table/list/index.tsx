'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from '@/components/ui/use-toast';
import DialogMaster from '../../dialog/master/form';
import DeleteMaster from '../../dialog/master/delete';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import UploadDialog from '../../dialog/list/upload';

const TableDistribution = () => {

  const [Response, setResponse]: any = React.useState({ loading: true });
  const [Update, setUpdate]: any = React.useState(1);
  const [IdMaster, setIdMaster] = React.useState(null)
  const [open, setOpen] = React.useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/distribution');
      const data: any = await res?.json()
      if (res.ok) {
        setResponse(() => ({
          loading: false,
          ...data
        }))
      } else {
        toast({
          title: 'Error',
          description: data.message
        })
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message
      })
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [Update]);

  const handleOpen = (id: any) => {
    setIdMaster(id)
    setOpen(true)
  }

  return (
    <Card className=" col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Distribution</CardTitle>
          <CardDescription>
            Recent Distribution from your database.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
            <div className="">
              <UploadDialog />
            </div>
            <div className="ml-auto">
              <div className="p-2 text-sm "> Total : {Response?.data?.total} </div>
            </div>
            <div className="p-2 text-sm "> Take 10 Datas  </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Distribution Channel</TableHead>
                <TableHead >Delivery Order Date</TableHead>
                <TableHead >Deliveri Order Number</TableHead>
                <TableHead >Sales Order</TableHead>
                <TableHead >Customer</TableHead>
                <TableHead >City</TableHead>
                <TableHead >Region</TableHead>
                <TableHead >Category</TableHead>
                <TableHead >Catalog</TableHead>
                <TableHead >Description</TableHead>
                <TableHead >Serial Number</TableHead>
                <TableHead >Created</TableHead>
                <TableHead >Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Response?.data?.list?.map((item: any, idx: number) => (
                <TableRow className=' cursor-pointer'>
                  <React.Fragment key={item?.id}>
                    <TableCell >{idx + 1}</TableCell>
                    <TableCell >{item?.idMaster} </TableCell>
                    <TableCell >{moment(item?.date_do).format('DD/MM/YY')} </TableCell>
                    <TableCell >{item?.do_number} </TableCell>
                    <TableCell >{item?.seller_order} </TableCell>
                    <TableCell >{item?.customer} </TableCell>
                    <TableCell >{item?.city} </TableCell>
                    <TableCell >{item?.region} </TableCell>
                    <TableCell >{item?.category} </TableCell>
                    <TableCell >{item?.catalog} </TableCell>
                    <TableCell >{item?.description} </TableCell>
                    <TableCell >{item?.serial_number} </TableCell>
                    <TableCell >{moment(item?.created_at).format('DD/MM/YY')} </TableCell>
                    <TableCell >{moment(item?.updated_at).format('DD/MM/YY')} </TableCell>
                  </React.Fragment>
                </TableRow>
              ))}
            </TableBody>
          </Table>


          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>



        </div>
      </CardContent>
    </Card>

  )
}

export default TableDistribution