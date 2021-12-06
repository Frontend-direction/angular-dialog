import { Observable, Subject } from 'rxjs';

export class DialogRef {
  private readonly _afterClosed = new Subject<any>();
  private readonly _overlayClicked = new Subject<any>();

  afterClosed: Observable<any> = this._afterClosed.asObservable();
  overlayClicked: Observable<any> = this._overlayClicked.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }

  clickOnOverlay(result: any) {
    this._overlayClicked.next(result);
  }
}