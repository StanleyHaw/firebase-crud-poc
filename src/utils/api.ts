import { collection, getDocs } from 'firebase/firestore';
import { setDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@config/firebase';
import { Data } from 'types/index';

export const getData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'UserData'));
    const data: Data[] = querySnapshot.docs.map((doc) => doc.data() as Data);
    return data;
  } catch (error) {
    console.error('Failed to fetch data: ', error);
  }
};

export const addNewData = async (newData: Data) => {
  try {
    const docRef = doc(db, 'UserData', newData.id);
    await setDoc(docRef, newData);
  } catch (error) {
    console.error('Failed to add data: ', error);
    throw new Error('Failed to add data');
  }
};

export const updateData = async (data: Data) => {
  try {
    const docRef = doc(db, 'UserData', data.id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error('Failed to update data: ', error);
    throw new Error('Failed to update data');
  }
};

export const deleteData = async (id: string) => {
  try {
    const docRef = doc(db, 'UserData', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Failed to delete data: ', error);
    throw new Error('Failed to delete data');
  }
};
