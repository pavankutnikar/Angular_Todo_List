import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

fdescribe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  const event = {
    currentTarget: {
      childNodes: [
        {
          parentNode: {
            parentElement: {
              attributes: [
                {
                  ownerElement: {
                    childNodes: [
                      {
                        innerText: '1'
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      ]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update lists', () => {
    component.updateList();
    expect(component.enteredName).toEqual('');
  });

  it('should check finalHtmlNameList on change of select to all', () => {
    component.finalHtmlNameList = ['1'];
    component.onChangeofOptions('all');
    expect(component.finalHtmlNameList).toBeDefined();
  });

  it('should check finalHtmlNameList on change of select to completed', () => {
    component.finalHtmlNameList = ['1'];
    component.onChangeofOptions('completed');
    expect(component.finalHtmlNameList).toBeDefined();
  });

  it('should check finalHtmlNameList on change of select to uncompleted', () => {
    component.finalHtmlNameList = ['1'];
    component.onChangeofOptions('uncompleted');
    expect(component.finalHtmlNameList).toBeDefined();
  });

  it('should check list is deleting from array', () => {
    component.finalNameList = ['1', '2'];
    component.completedLists = ['1', '2'];
    component.uncompletedLists = ['1', '2'];
    component.deleteList(event);
    expect(component.finalNameList).toBeGreaterThanOrEqual(1);
    expect(component.completedLists).toBeGreaterThanOrEqual(1);
    expect(component.uncompletedLists).toBeGreaterThanOrEqual(1);
  });

  it('should check list is  updating after adit', () => {
    component.finalNameList = ['1', '2'];
    component.editList(event);
    expect(component.completedLists.length).toEqual(1);
    expect(component.uncompletedLists.length).toEqual(1);
  });

  it('should get true completed list', () => {
    component.completedLists = ['1', '2'];
    component.getCompletedList('1')
    expect(component.getCompletedList).toBeTruthy();
  });
});
