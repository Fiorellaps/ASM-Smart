import { TestEntity } from './test-list.vm';
import { getTests as getTestDetailApi } from './api/test-list.api';
import { mapTestCollectionFromApiToVm } from './test-list.mappers';

export const getTestCollection = (): Promise<TestEntity[]> => {
  return new Promise<TestEntity[]>((resolve) => {
    getTestDetailApi().then((result) => {
      resolve(mapTestCollectionFromApiToVm(result));
    });
  });
};
