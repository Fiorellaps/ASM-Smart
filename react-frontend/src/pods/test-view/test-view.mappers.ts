import * as viewModel from './test-view.vm';
import * as apiModel from './api/test-view.api-model';
import { mapToCollection } from 'common/mappers';

export const mapTestFromApiToVm = (
  test: apiModel.TestEntityApi
): viewModel.TestEntity => ({
  ...test,
});

export const mapTestCollectionFromApiToVm = (
  memberCollection: apiModel.TestEntityApi[]
): viewModel.TestEntity[] =>
  mapToCollection(memberCollection, (e) => mapTestFromApiToVm(e));
