import { useState, useEffect } from 'react';
import { getData } from './utils/api';
import { DataListProps } from 'types/index';

function App() {
  const [dataList, setDataList] = useState<DataListProps[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: DataListProps[] | undefined = await getData();
      setDataList(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className={'text-red-500 text-4xl'}>Hello World!</h1>
      {dataList?.map((data) => {
        const { id, name, age, gender, country } = data;
        return (
          <div key={id}>
            <p>{name}</p>
            <p>{age}</p>
            <p>{gender}</p>
            <p>{country}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
