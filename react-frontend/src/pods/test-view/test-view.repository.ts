import { TestEntity } from './test-view.vm';
import { getTestViewAPI as getTestDashboardApi } from './api/test-view.api';
import { mapTestCollectionFromApiToVm } from './test-view.mappers';

export const getTestView = (idTest): Promise<TestEntity[]> => {
  return new Promise<TestEntity[]>((resolve) => {
    getTestDashboardApi(idTest).then((result) => {
      resolve(result);
    });
  });
};
