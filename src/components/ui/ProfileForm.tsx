import { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/Label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Data, Country } from '@/types';
import { genderList } from '@/utils/constant';
import { getCountryList } from '@/utils/countryApi';
import { Button } from '@components/ui/Button';

type ProfileForm = {
  submitButtonContext: string;
  defaultValues: Data;
  onSubmitData: (data: Data) => void;
  onSubmitSuccess: (isSuccessful: boolean) => void;
};

function ProfileForm({ submitButtonContext, defaultValues, onSubmitData, onSubmitSuccess }: ProfileForm) {
  const [countryList, setCountryList] = useState<Country[]>([]);

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

  const formSchema = z.object({
    id: z.string(),
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
    defaultValues: defaultValues
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors }
  } = form;

  function onSubmit(data: z.infer<typeof formSchema>) {
    onSubmitSuccess(isSubmitSuccessful);
    onSubmitData(data);
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
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
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
        <Button className="px-8 py-4 mt-4 text-white bg-indigo-600 hover:text-white hover:bg-indigo-700" type="submit">
          {submitButtonContext}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
