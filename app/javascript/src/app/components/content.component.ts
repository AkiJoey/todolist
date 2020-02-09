import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content',
  template: `
    <div id="content">
      <mat-card>
        <div class="card-head">
          <mat-form-field>
            <input matInput [(ngModel)]="name" (change)="postName()" placeholder="Project Name">
          </mat-form-field>
          <mat-form-field>
            <input matInput [(ngModel)]="date" (dateChange)="postDate()" [matDatepicker]="picker" placeholder="Deadline Date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <button mat-raised-button (click)="insertMission()" color="primary">+ New Mission</button>
        </div>
        <mat-divider></mat-divider>
        <div class="card-body">
          <div class="card-item" *ngFor="let mission of missions;let i = index">
            <mat-checkbox [(ngModel)]="mission.state" (click)="postState(i)">{{mission.name}}</mat-checkbox>
            <mat-chip-list>
              <mat-chip *ngFor="let tag of mission.tags">{{tag}}</mat-chip>
              <button mat-icon-button (click)="deleteMission(i)" color="warn">
                <mat-icon>delete_forever</mat-icon>
              </button>
            </mat-chip-list>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styleUrls: ['/app/assets/stylesheets/content.component.scss']
})
@Injectable()
export class ContentComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  public name: string;
  public date: string;
  public missions: {
    id: number,
    name: string,
    tags: string[],
    state: boolean
  }[] = [];
  public snackBarConfig: any = {
    duration: 2000,
    verticalPosition: 'top'
  };

  postName(): void {
    this.http.post('http://localhost:3000/post/name', {
      name: this.name
    })
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  postDate(): void {
    this.http.post('http://localhost:3000/post/date', {
      date: this.date
    })
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  postState(index: number): void {
    this.http.post('http://localhost:3000/post/state', {
      id: this.missions[index].id,
      state: !this.missions[index].state
    })
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  insertMission(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        snackBarConfig: this.snackBarConfig
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.name != null && result.name != '' && result.tags != false) {
          this.http.get('http://localhost:3000/get/last')
          .subscribe(
            response => {
              result.id = response.id;
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
          this.missions.push(result);
        }
      }
    });
  }

  deleteMission(index: number): void {
    this.http.delete('http://localhost:3000/delete/mission?id=' + this.missions[index].id)
    .subscribe(
      response => {
        this.missions.splice(index, 1);
        this.snackBar.open('✅ Delete', 'success', this.snackBarConfig);
        console.log(response);
      },
      error => {
        this.snackBar.open('❌ Delete', 'error', this.snackBarConfig);
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/get/project')
    .subscribe(
      response => {
        this.name = response.name;
        this.date = response.date;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    this.http.get('http://localhost:3000/get/missions')
    .subscribe(
      response => {
        response.forEach(mission => {
          this.missions.push({
            id: mission.id,
            name: mission.name,
            tags: mission.tags.split(','),
            state: mission.state
          });
        });
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}

@Component({
  selector: 'dialog-component',
  template: `
    <h1 mat-dialog-title>New Mission</h1>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="name" placeholder="Mission Name">
      </mat-form-field>
      <mat-form-field>
        <mat-chip-list #chipList>
          <mat-chip *ngFor="let tag of tags" [removable]="removable" (removed)="removeTag(tag)">
            {{tag}}<mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
          </mat-chip>
          <input placeholder="Mission Tags" [matChipInputFor]="chipList" matChipInputAddOnBlur (matChipInputTokenEnd)="addTag($event)">
        </mat-chip-list>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions style="flex-direction: row-reverse;">
      <button mat-stroked-button [mat-dialog-close]="{id:id,name:name,tags:tags,state:false}" (click)="postMission()" color="primary">Confirm</button>
      <button mat-stroked-button (click)="closeDialog()">Cancel</button>
    </mat-dialog-actions>
  `,
  styles: ['.mat-form-field{width: 100%}.mat-stroked-button{margin: 0 5px 15px;}']
})
@Injectable()
export class DialogComponent {
  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  public id: number;
  public name: string;
  public tags: string[] = [];
  public removable: boolean = true;

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  postMission(): void {
    if (this.name == null || this.name == '') {
      this.snackBar.open('🚫 Please input name', 'warn', this.data.snackBarConfig);
    }
    else if (this.tags == false) {
      this.snackBar.open('🚫 Please input tag', 'warn', this.data.snackBarConfig);
    }
    else {
      this.http.post('http://localhost:3000/post/mission', {
        name: this.name,
        tags: this.tags
      })
      .subscribe(
        response => {
          this.snackBar.open('✅ Insert', 'success', this.data.snackBarConfig);
          console.log(response);
        },
        error => {
          this.snackBar.open('❌ Insert', 'error', this.data.snackBarConfig);
          console.log(error);
        }
      );
    }
  }

}
