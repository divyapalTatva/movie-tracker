import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models';
import { MoviesService } from 'src/app/services/movie/movies.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogboxComponent } from '../../../../shared/components/dialogbox/dialogbox.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  constructor(private dialog:MatDialog){

  }
@Input() movie!:Movie;
@Output() deleteEvent=new EventEmitter<number>()
watchlistIcon:string='add';

toggleWatchList(){
  this.watchlistIcon=='add' ? this.watchlistIcon='done' :this.watchlistIcon='add'
}

deleteMovie(id:number){
  const dialogRef=this.dialog.open(DialogboxComponent,{data:"Are you sure want to delete?"});
  dialogRef.afterClosed().subscribe((data)=>{
    if(data=="ok"){
      this.deleteEvent.emit(id);
    }
  })

}

}
