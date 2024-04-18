import { TestBed } from '@angular/core/testing';

import { YoutubeserviceService } from './youtubeservice.service';

describe('YoutubeserviceService', () => {
  let service: YoutubeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
