import { useState, useEffect } from 'react';
import { getData } from '@utils/api';
import { Data } from 'types/index';
import FormDialog from './components/FormDialog';

function App() {
  const [dataList, setDataList] = useState<Data[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Data[] | undefined = await getData();
      setDataList(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <FormDialog />
    </>
  );
}

export default App;
