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

const UploadDialog = () => {

  const [Response, setResponse]: any = React.useState({ loading: false, data: null })

  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     code: '',
  //     status: false,
  //     contact: '',
  //     description: ''
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required(),
  //     code: Yup.string().required(),
  //     status: Yup.string().required(),
  //     contact: Yup.string().required(),
  //     description: Yup.string().required(),
  //   }),
  //   onSubmit: async (values) => {
  //     console.log("🚀 ~ values:", values)
  //     try {
  //       setResponse({ loading: true, data: null })
  //       if (!isEdit) {
  //         await axios.post('/api/distribution/master', values)
  //           .then((result) => {
  //             const res = result.data
  //             console.log("🚀 ~ .then ~ result:", res)
  //             if (res.code == 200) {
  //               setUpdate((state: number) => state + 1)
  //               setResponse((state: any) => ({
  //                 ...state,
  //                 ...res
  //               }))
  //               return formik.resetForm()
  //             } else {
  //               toast({
  //                 title: 'Error',
  //                 description: res.message
  //               })
  //             }
  //           }).catch((err: any) => {
  //             toast({
  //               title: 'Internal Server Error',
  //               description: err.message
  //             })
  //           });
  //       } else {
  //         await axios.patch('/api/distribution/master', { ...values, id: id })
  //           .then((result) => {
  //             const res = result.data
  //             if (res.code == 200) {
  //               setUpdate((state: number) => state + 1)
  //               toast({
  //                 title: 'Success',
  //                 description: 'Data Updated'
  //               })
  //               setOpen(false)
  //             } else {
  //               toast({
  //                 title: 'Error',
  //                 description: res.message
  //               })
  //             }
  //           }).catch((err: any) => {
  //             toast({
  //               title: 'Internal Server Error',
  //               description: err.message
  //             })
  //           });
  //       }
  //     } catch (error: any) {
  //       toast({
  //         title: 'Internal Server Error',
  //         description: error.message
  //       })
  //     }
  //   }
  // })


  // const fetchData = async () => {
  //   try {
  //     await axios.get('/api/distribution/master', {
  //       params: {
  //         id: id
  //       }
  //     }).then((result: any) => {
  //       const retrive = result.data
  //       if (retrive.code == 200) {
  //         Object.keys(retrive.data).forEach(key => {
  //           const value = retrive.data[key]
  //           formik.setFieldValue(key, value)
  //         });
  //       } else {
  //         toast({
  //           title: 'Error',
  //           description: 'Data not Found'
  //         })
  //       }
  //     }).catch((err: any) => {
  //       toast({
  //         title: 'Internal Server Error',
  //         description: err.message
  //       })
  //     });
  //   } catch (error) {

  //   }
  // }

  // React.useEffect(() => {
  //   if (id && open) {
  //     fetchData()
  //   }
  //   if (!open) {
  //     setResponse({ loading: false })
  //   }
  // }, [id, open]);

  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button id='triggerDialog' variant='default' size={'sm'}>Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form >
          <DialogHeader>
            <DialogTitle>Upload Distribution</DialogTitle>
            <DialogDescription>
              Make sure the file from spreadsheet extensions. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input type="file" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} size={'sm'}>Close</Button>
            </DialogClose>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default UploadDialog


