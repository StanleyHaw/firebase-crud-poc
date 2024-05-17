import { collection, getDocs } from 'firebase/firestore';
import { setDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@config/firebase';
import { Data } from 'types/index';
import { v4 as uuidv4 } from 'uuid';

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
    const newDataId = uuidv4().split('-')[0];
    const result = { ...newData, id: newDataId };
    const docRef = doc(db, 'UserData', newDataId);
    await setDoc(docRef, result);
  } catch (error) {
    console.error('Failed to add data: ', error);
  }
};

export const updateData = async (data: Data) => {
  try {
    const docRef = doc(db, 'UserData', data.id);
    return await setDoc(docRef, data);
  } catch (error) {
    console.error('Failed to update data: ', error);
  }
};

export const deleteData = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'UserData', id));
  } catch (error) {
    console.error('Failed to delete data: ', error);
  }
};
