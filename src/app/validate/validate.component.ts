import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogConfig } from '../dialog/dialog-config';
import { DialogRef } from '../dialog/dialog-ref'; 
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent {

  constructor(
    public config: DialogConfig<any>,
    public dialog: DialogRef,
    public dialogService: DialogService
  ) {}

  close() {
    this.dialog.close('ok');
  }

  abortAction() {
    this.dialog.close('close');
  } 

}
