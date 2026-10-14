import { TestBed } from '@angular/core/testing';
import { DataTask } from './data-task.service';

describe('DataTask', () => {
  let service: DataTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
