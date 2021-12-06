import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog-injector';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Injectable({
  providedIn: DialogModule
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  public open<T>(componentType: Type<any>, config: DialogConfig<any>) {
    const dialogRef = this.appendDialogComponentToBody<T>(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody<T>(config: DialogConfig<any>) {
    const map = new WeakMap();
    map.set(DialogConfig, config);
 
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
      sub.unsubscribe();
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}