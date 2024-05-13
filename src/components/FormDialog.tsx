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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/Label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Country } from '@/types';
import { getCountryList } from '@/utils/countryApi';

type ProfileForm = {
  onSubmitSuccess: (isSuccessful: boolean) => void;
};

function ProfileForm({ onSubmitSuccess }: ProfileForm) {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const genderList = ['male', 'female'];

  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Name cannot be blank'
    }),
    age:
      z.number().min(18, {
        message: 'Age must be at least 18 years old.'
      }) || 0,
    gender: z.string(),
    country: z.string().min(1, {
      message: 'Please choose your country.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0,
      gender: genderList[0],
      country: ''
    }
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors }
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountryList();
        setCountryList(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitSuccess(isSubmitSuccessful);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center">
              <FormLabel className="row-span-2">Name</FormLabel>
              <FormControl>
                <Input className="col-span-3" placeholder="Please enter your name..." {...field} />
              </FormControl>
              {errors.name && <FormMessage className="col-span-3 font-normal text-xs" />}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="age"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center">
              <FormLabel className="row-span-2">Age</FormLabel>
              <FormControl>
                <Input
                  className="col-span-3"
                  placeholder="Please enter your age..."
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value || 0)}
                />
              </FormControl>
              {errors.age && <FormMessage className="col-span-3 font-normal text-xs" />}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center">
              <FormLabel className="row-span-2">Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  className="flex flex-row gap-6"
                  defaultValue={genderList[0]}
                  onValueChange={field.onChange}
                >
                  {genderList &&
                    genderList.map((gender) => (
                      <div key={gender} className="flex items-center space-x-2">
                        <RadioGroupItem value={gender} id={gender} />
                        <Label className="cursor-pointer" htmlFor={gender}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </Label>
                      </div>
                    ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="col-span-3 font-normal text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center">
              <FormLabel className="row-span-2">Country</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="--Select your country--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countryList &&
                        countryList.map((country) => {
                          const countryName = country.name.common;
                          return (
                            <SelectItem key={countryName} value={countryName}>
                              {countryName}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="col-span-3 font-normal text-xs" />
            </FormItem>
          )}
        />
        <Button className="px-8 py-4 mt-4  text-white bg-indigo-600 hover:text-white hover:bg-indigo-700" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function FormDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (isSuccessful: boolean) => {
    setIsOpen(isSuccessful);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
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
        <ProfileForm onSubmitSuccess={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
