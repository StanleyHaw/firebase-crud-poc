type Data = {
  id: string;
  name: string;
  age: number;
  gender: string;
  country: string;
};

type Country = {
  name: {
    common: string;
  };
};

export { Data, Country };
