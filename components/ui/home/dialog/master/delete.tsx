'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import moment from 'moment'


interface param {
  id: any,
  setUpdate: any
}

const DeleteMaster: React.FC<param> = ({ id, setUpdate }) => {

  const doDelete = async () => {
    await axios.patch('/api/distribution/master', {
      id: id,
      deleted_at: new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
    })
      .then((result) => {
        const retrieve: any = result.data
        if (retrieve.code = 200) {
          toast({
            title: 'Success',
            description: 'One of the data from Distribution Master has been deleted..'
          })
          setUpdate((state: any) => state + 1)
        } else {
          toast({
            title: 'Error',
            description: retrieve.message
          })
        }
      }).catch((err: any) => {
        toast({
          title: 'Internal Server Error',
          description: err.message
        })
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size='sm'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This action will remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => doDelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default DeleteMaster