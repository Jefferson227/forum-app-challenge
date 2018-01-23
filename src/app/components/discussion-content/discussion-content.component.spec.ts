import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionContentComponent } from './discussion-content.component';

describe('DiscussionContentComponent', () => {
  let component: DiscussionContentComponent;
  let fixture: ComponentFixture<DiscussionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
