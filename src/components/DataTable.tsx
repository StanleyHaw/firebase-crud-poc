import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@components/ui/AlertDialog';
import { Button } from '@components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/Dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/Table';
import ProfileForm from '@components/ui/ProfileForm';
import { Data } from '@/types';

type EditDialog = {
  defaultValues: Data;
  onSubmitData: (values: Data) => void;
};

function EditDialog({ defaultValues, onSubmitData }: EditDialog) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (isSuccessful: boolean) => {
    setIsOpen(isSuccessful);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-2.5 rounded-lg">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new user</DialogTitle>
          <DialogDescription>Please fill in the following information. Once completed, press Submit.</DialogDescription>
        </DialogHeader>
        <ProfileForm defaultValues={defaultValues} onSubmitData={onSubmitData} onSubmitSuccess={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}

type DeleteDialog = {
  id: string;
  onDeleteData: (id: string) => void;
};

function DeleteDialog({ id, onDeleteData }: DeleteDialog) {
  const handleDelete = () => {
    onDeleteData(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="px-2.5 rounded-lg text-white bg-red-600 hover:text-white  hover:bg-red-800"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to DELETE this user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete from user list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type DataTable = {
  dataList: Data[] | undefined;
  onDeleteData: (id: string) => void;
  onSubmitEditedData: (values: Data) => void;
};

function DataTable({ dataList = [], onDeleteData, onSubmitEditedData }: DataTable) {
  return (
    <Table>
      <TableCaption>- A list of users -</TableCaption>
      <TableHeader className="bg-none shadow overflow-hidden">
        <TableRow className="hover:bg-transparent">
          <TableHead className="">Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Country</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!!dataList.length &&
          dataList.map((data) => {
            const { id, name, age, gender, country } = data;
            const userValues = {
              id: id,
              name: name,
              age: age,
              gender: gender,
              country: country
            };

            return (
              <TableRow key={id}>
                <TableCell className="font-bold text-indigo-600">{name}</TableCell>
                <TableCell>{age}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{country}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditDialog defaultValues={userValues} onSubmitData={onSubmitEditedData} />
                  <DeleteDialog id={id} onDeleteData={onDeleteData} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default DataTable;
