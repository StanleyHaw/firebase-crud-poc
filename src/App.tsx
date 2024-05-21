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
import { Skeleton } from '@components/ui/Skeleton';
import { Toaster, toast } from 'sonner';
import DataTable from '@components/DataTable';
import ProfileForm from '@components/ui/ProfileForm';
import { Data } from '@/types';
import { getData, addNewData, deleteData, updateData } from '@utils/api';
import { genderList } from './utils/constant';
import { v4 as uuidv4 } from 'uuid';

const LOADING_TIME = 1000;

const promise = () => new Promise<void>((resolve) => setTimeout(() => resolve(), LOADING_TIME));

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
        <ProfileForm
          submitButtonContext="Submit"
          defaultValues={defaultValues}
          onSubmitData={onSubmitData}
          onSubmitSuccess={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

type ToastMessage = {
  action: 'add' | 'edit' | 'delete';
  name?: string;
};

function App() {
  const [dataList, setDataList] = useState<Data[] | undefined>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const emptyValues = {
    id: '',
    name: '',
    age: 0,
    gender: genderList[0],
    country: ''
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      const data: Data[] | undefined = await getData();
      setIsLoadingData(false);
      setDataList(data);
    };

    fetchData();
  }, []);

  function handleToastMessage({ action, name }: ToastMessage) {
    const successMessage = {
      add: `${name} has been added`,
      edit: 'Edited successfully',
      delete: 'deleted successfully'
    }[action];

    toast.promise(promise, {
      loading: 'Loading...',
      success: successMessage,
      error: 'Error occurred, please Try again.',
      className: 'text-gray-500'
    });
  }

  const handleAddUser = async (newData: Data) => {
    const newDataId = uuidv4().split('-')[0];
    const newDataWithId = { ...newData, id: newDataId };
    handleToastMessage({ action: 'add', name: newData.name });
    setTimeout(() => {
      setDataList((prev) => [...(prev || []), newDataWithId]);
    }, LOADING_TIME);
    await addNewData(newDataWithId);
  };

  const handleEditUser = async (updatedData: Data) => {
    handleToastMessage({ action: 'edit' });
    setTimeout(() => {
      setDataList((prev) => prev?.map((data) => (data.id === updatedData.id ? updatedData : data)));
    }, LOADING_TIME);
    await updateData(updatedData);
  };

  const handleDelete = async (id: string) => {
    handleToastMessage({ action: 'delete' });
    setTimeout(() => {
      setDataList((prev) => prev?.filter((data) => id !== data.id));
    }, LOADING_TIME);
    await deleteData(id);
  };

  return (
    <>
      <div className="container mx-auto py-8 space-y-4">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="">
            <h1 className="text-4xl font-bold">Firebase CRUD poc</h1>
            <p className="text-gray-400 font-light">
              This project utilizes <span className="text-pink-600">React Hook Form</span> in conjunction with{' '}
              <span className="text-black">Shadcn UI</span> and <span className="text-black">Sonner Toaster</span>.
            </p>
          </div>
          <AddDialog defaultValues={emptyValues} onSubmitData={handleAddUser} />
        </div>
        {isLoadingData && (
          <>
            <div className="grid grid-cols-[1fr_1fr_3fr] gap-4">
              <Skeleton className="w-[85%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[80%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[80%] h-[50px] rounded-1/2 ml-auto" />
            </div>
            <div className="grid grid-cols-[1fr_1fr_3fr] gap-4">
              <Skeleton className="w-[100%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[60%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[80%] h-[50px] rounded-1/2 ml-auto" />
            </div>
            <div className="grid grid-cols-[1fr_1fr_3fr] gap-4">
              <Skeleton className="w-[60%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[80%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[80%] h-[50px] rounded-1/2 ml-auto" />
            </div>
            <div className="grid grid-cols-[1fr_1fr_3fr] gap-4">
              <Skeleton className="w-[75%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[100%] h-[50px] rounded-1/2" />
              <Skeleton className="w-[80%] h-[50px] rounded-1/2 ml-auto" />
            </div>
          </>
        )}
        {!isLoadingData && dataList && (
          <DataTable dataList={dataList} onSubmitEditedData={handleEditUser} onDeleteData={handleDelete} />
        )}
      </div>
      <Toaster richColors />
    </>
  );
}

export default App;
