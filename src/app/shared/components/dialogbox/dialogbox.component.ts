import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent {

constructor(public dialogRef:MatDialogRef<DialogboxComponent>,@Inject(MAT_DIALOG_DATA) public data:string){

}

onNoClick(){
  this.dialogRef.close()
}
}
