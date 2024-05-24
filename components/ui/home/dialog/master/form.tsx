'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import * as Yup from 'yup'
import React from 'react'
import { useFormik } from "formik"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RocketIcon } from "lucide-react"
import { title } from "process"
import { toast } from "@/components/ui/use-toast"



interface params {
  isEdit?: boolean,
  setUpdate: any,
  id?: any,
  setOpen: any,
  open: any
}

const DialogMaster: React.FC<params> = ({ isEdit, setUpdate, id, open, setOpen }) => {

  const [Response, setResponse]: any = React.useState({ loading: false, data: null })

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      status: false,
      contact: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      code: Yup.string().required(),
      status: Yup.string().required(),
      contact: Yup.string().required(),
      description: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log("🚀 ~ values:", values)
      try {
        setResponse({ loading: true, data: null })
        if (!isEdit) {
          await axios.post('/api/distribution/master', values)
            .then((result) => {
              const res = result.data
              console.log("🚀 ~ .then ~ result:", res)
              if (res.code == 200) {
                setUpdate((state: number) => state + 1)
                setResponse((state: any) => ({
                  ...state,
                  ...res
                }))
                return formik.resetForm()
              } else {
                toast({
                  title: 'Error',
                  description: res.message
                })
              }
            }).catch((err: any) => {
              toast({
                title: 'Internal Server Error',
                description: err.message
              })
            });
        } else {
          await axios.patch('/api/distribution/master', { ...values, id: id })
            .then((result) => {
              const res = result.data
              if (res.code == 200) {
                setUpdate((state: number) => state + 1)
                toast({
                  title: 'Success',
                  description: 'Data Updated'
                })
                setOpen(false)
              } else {
                toast({
                  title: 'Error',
                  description: res.message
                })
              }
            }).catch((err: any) => {
              toast({
                title: 'Internal Server Error',
                description: err.message
              })
            });
        }
      } catch (error: any) {
        toast({
          title: 'Internal Server Error',
          description: error.message
        })
      }
    }
  })


  const fetchData = async () => {
    try {
      await axios.get('/api/distribution/master', {
        params: {
          id: id
        }
      }).then((result: any) => {
        const retrive = result.data
        if (retrive.code == 200) {
          Object.keys(retrive.data).forEach(key => {
            const value = retrive.data[key]
            formik.setFieldValue(key, value)
          });
        } else {
          toast({
            title: 'Error',
            description: 'Data not Found'
          })
        }
      }).catch((err: any) => {
        toast({
          title: 'Internal Server Error',
          description: err.message
        })
      });
    } catch (error) {

    }
  }

  React.useEffect(() => {
    if (id && open) {
      fetchData()
    }
    if (!open) {
      setResponse({ loading: false })
    }
  }, [id, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button id='triggerDialog' variant='default' size={'sm'}>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add"} Distribution Master</DialogTitle>
            <DialogDescription>
              Make sure the field is fielded full. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {Response?.data != null ? (
              <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>{Response?.code == 200 ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>
                  {Response?.message}
                </AlertDescription>
              </Alert>
            ) : null}
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-2 grow">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input id="name" name="name" value={formik.values.name} onChange={formik.handleChange} className="col-span-3" />
                {formik.touched.name && formik.errors.name ? (
                  <div className="bg-slate-100 p-1 text-xs rounded-lg text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 w-2/6">
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center gap-2">
                  <Switch type={'button'} id="status" name={'status'} checked={formik.values?.status} onCheckedChange={(checked: boolean) => formik.setFieldValue('status', checked)} />
                  <Label htmlFor="status">Active</Label>
                </div>
                {formik.touched.status && formik.errors.status ? (
                  <div className="bg-slate-100 p-1 text-xs rounded-lg text-red-500">{formik.errors.status}</div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="code" className="text-left">
                  Code
                </Label>
                <Input id="code" name="code" value={formik.values.code} onChange={formik.handleChange} className="col-span-3" />
                {formik.touched.code && formik.errors.code ? (
                  <div className="bg-slate-100 p-1 text-xs rounded-lg text-red-500">{formik.errors.code}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact" className="text-left">
                  Contact
                </Label>
                <Input id="contact" name="contact" value={formik.values.contact} onChange={formik.handleChange} className="col-span-3" />
                {formik.touched.contact && formik.errors.contact ? (
                  <div className="bg-slate-100 p-1 text-xs rounded-lg text-red-500">{formik.errors.contact}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea id="description" name="description" value={formik.values.description} onChange={formik.handleChange} className="col-span-3" />
              {formik.touched.description && formik.errors.description ? (
                <div className="bg-slate-100 p-1 text-xs rounded-lg text-red-500">{formik.errors.description}</div>
              ) : null}
            </div>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} size={'sm'}>Close</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default DialogMaster


