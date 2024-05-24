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

const TableDistributionMaster = () => {

  const [Response, setResponse]: any = React.useState({ loading: true });
  const [Update, setUpdate]: any = React.useState(1);
  const [IdMaster, setIdMaster] = React.useState(null)
  const [open, setOpen] = React.useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/distribution/master');
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
    <Card className="" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Distribution Channel</CardTitle>
          <CardDescription>
            Recent Distribution Channel from your database.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <div className="flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
            <div className=" ml-auto">
              <DialogMaster
                setUpdate={setUpdate}
                setOpen={setOpen}
                open={open}
                id={IdMaster}
                isEdit={IdMaster ? true : false} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Code</TableHead>
                <TableHead >Name</TableHead>
                <TableHead >Contact</TableHead>
                <TableHead >Description</TableHead>
                <TableHead className='hidden' >Description</TableHead>
                <TableHead className='hidden' >Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Response?.data?.map((item: any, idx: number) => (
                <TableRow className=' cursor-pointer'>
                  <React.Fragment key={item?.id}>
                    <TableCell onClick={() => handleOpen(item.id)}>{idx + 1}</TableCell>
                    <TableCell onClick={() => handleOpen(item.id)}>{item?.code} </TableCell>
                    <TableCell onClick={() => handleOpen(item.id)}>{item?.name}</TableCell>
                    <TableCell onClick={() => handleOpen(item.id)}>{item?.contact}</TableCell>
                    <TableCell onClick={() => handleOpen(item.id)}>{item?.description}</TableCell>
                    <TableCell className='text-right' >  {item.status ?
                      (<Badge variant='default' className='text-xs'>Active</Badge>)
                      :
                      (<Badge variant='destructive' className='text-xs'>UnActive</Badge>)
                    }</TableCell>
                    <TableCell className='text-right' ><DeleteMaster setUpdate={setUpdate} id={item?.id} /></TableCell>
                  </React.Fragment>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

  )
}

export default TableDistributionMaster