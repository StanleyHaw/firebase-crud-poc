import { useState, useEffect } from 'react';
import { Button } from '@components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/Dialog';
import DataTable from '@components/DataTable';
import ProfileForm from '@components/ui/ProfileForm';
import { Data } from '@/types';
import { getData } from '@utils/api';
import { genderList } from './utils/constant';

type AddDialog = {
  defaultValues: Data;
  onSubmitData: (values: Data) => void;
};

function AddDialog({ defaultValues, onSubmitData }: AddDialog) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (isSuccessful: boolean) => {
    setIsOpen(isSuccessful);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-[calc(180px)] text-white bg-indigo-600 hover:text-white hover:bg-indigo-700"
        >
          Add User
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

function App() {
  const [dataList, setDataList] = useState<Data[] | undefined>([]);
  const emptyValues = {
    id: '',
    name: '',
    age: 0,
    gender: genderList[0],
    country: ''
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: Data[] | undefined = await getData();
      setDataList(data);
    };

    fetchData();
  }, []);

  const handleAddUser = (data: Data) => {
    console.log(data, 'added');
  };

  const handleEditUser = (data: Data) => {
    console.log(data, 'edited');
  };

  const handleDelete = (id: string) => {
    console.log(id, 'deleted');
  };

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="">
          <h1 className="text-4xl font-bold">Firebase CRUD poc</h1>
          <p className="text-gray-400 font-light">
            This project utilizes <span className="text-pink-600">React Hook Form</span> in conjunction with{' '}
            <span className="text-black">Shadcn UI</span>.
          </p>
        </div>
        <AddDialog defaultValues={emptyValues} onSubmitData={handleAddUser} />
      </div>
      <DataTable dataList={dataList} onSubmitEditedData={handleEditUser} onDeleteData={handleDelete} />
    </div>
  );
}

export default App;
