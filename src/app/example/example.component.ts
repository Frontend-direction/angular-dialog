import { ChangeDetectionStrategy, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DialogConfig } from '../dialog/dialog-config';
import { DialogRef } from '../dialog/dialog-ref'; 
import { DialogService } from '../dialog/dialog.service';
import { ValidateComponent } from '../validate/validate.component';

interface Details {
 message: string,
 description: string,
 validate: () => any,
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent implements OnInit {
  constructor(
    public config: DialogConfig<Details>,
    public dialog: DialogRef,
    public dialogService: DialogService
  ) {}

  actionBtnsTemp: TemplateRef<any>;
  status = 'DEFAULT';

  @ViewChild('defaultTemp', { static: true })
  private defaultTemplate: TemplateRef<any>;
  
  @ViewChild('requestAccessTemp',  { static: true })
  private requestAccessTemplate: TemplateRef<any>;

  ngOnInit() {
    this.actionBtnsTemp = Math.random() > 0.5 ? this.defaultTemplate : this.requestAccessTemplate
    console.log(this.requestAccessTemplate)
    this.dialog.overlayClicked.pipe().subscribe(res => {
      this.validate();
    })
  }

  validate() {
    this.open();
  }

  onClose() {
    this.dialog.close('close');
  }

  launchApp() {
    this.dialog.close('launch');
  }

  pinApp() {
    this.dialog.close('pin');
  }

  editApp() {
    this.open();
  }

  closeApp() {
    this.dialog.close();
  }

  open() {
    const ref = this.dialogService.open<Details>(ValidateComponent, { 
      data: { 
        message: 'Are your sure you want to close',
        description: 'Here will be perfect description',
      } 
    });

    ref.afterClosed.subscribe(result => {
      if(result === 'ok') {
        this.dialog.close('close');
      } else {
        console.log('Dialog closed', result);
      }
    });
  }

  requestAccess() {
    this.status = 'PENDING';
  }

  removeApp() {

  }
}
