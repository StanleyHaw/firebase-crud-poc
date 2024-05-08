import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DataListProps } from 'types/index';

export const getData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'UserData'));
    const data: DataListProps[] = querySnapshot.docs.map((doc) => doc.data() as DataListProps);
    return data;
  } catch (error) {
    console.error('Failed to fetch data: ', error);
  }
};
