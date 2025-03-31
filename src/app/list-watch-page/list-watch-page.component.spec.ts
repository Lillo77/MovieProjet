import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWatchPageComponent } from './list-watch-page.component';

describe('ListWatchPageComponent', () => {
  let component: ListWatchPageComponent;
  let fixture: ComponentFixture<ListWatchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWatchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
