import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { ExampleComponent } from './example/example.component';
import { ValidateComponent } from './validate/validate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public dialog: DialogService) {}

  open() {
    const ref = this.dialog.open(ExampleComponent, { 
      data: { 
        message: 'I am a dynamic component inside of a dialog!',
        description: 'Here will be perfect description',
      } 
    });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}
