import { 
  Component, 
  Type, 
  ComponentFactoryResolver,
  ViewChild, 
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef, 
  ChangeDetectionStrategy
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;
  
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();
  
  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    evt.stopPropagation();
    this.dialogRef.clickOnOverlay('click outside');
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}