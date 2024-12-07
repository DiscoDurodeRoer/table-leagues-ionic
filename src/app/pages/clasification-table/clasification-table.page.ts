import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonImg, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { ClasificationService } from 'src/app/services/clasification.service';
import { first, Observable } from 'rxjs';
import { ISeason } from 'src/app/models/season.model';
import { ILeague } from 'src/app/models/league.model';
import { IClasification } from 'src/app/models/clasification.model';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle, removeCircle } from 'ionicons/icons'
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

@Component({
  selector: 'app-clasification-table',
  templateUrl: './clasification-table.page.html',
  styleUrls: ['./clasification-table.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, AsyncPipe, IonGrid, IonRow, IonCol, IonSelect,IonSelectOption, IonImg, IonIcon, ReversePipe, NgClass, IonPopover]
})
export class ClasificationTablePage implements OnInit {

  private clasificationService = inject(ClasificationService)
  
  public leagues$: Observable<ILeague[]> = this.clasificationService.getFootballLeagues();
  public seasons$: Observable<ISeason[]> = new Observable<ISeason[]>;
  public clasification$: Observable<IClasification[]> = new Observable<IClasification[]>;

  public idLeagueSelected = '4335'
  public seasonSelected = '';


  ngOnInit() {
    addIcons({
      closeCircle,
      removeCircle,
      checkmarkCircle
    })
    this.getSeasons();
  }

  getSeasons(){
    this.seasons$ = this.clasificationService.getSeasons(this.idLeagueSelected);
    this.seasons$.pipe(first()).subscribe({
      next: (seasons: ISeason[]) => {
        if(seasons.length > 0){
          this.seasonSelected = seasons[0].strSeason;
          this.changeClasification()
        }
      }
    })
  }

  changeClasification(){
    this.clasification$ = this.clasificationService.getTableClasification(this.idLeagueSelected, this.seasonSelected);
  }

}
