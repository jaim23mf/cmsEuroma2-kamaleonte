import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { ReachService } from '../api_connection/api_reach/reach.service';
import { GlobalConstants } from '../common/global-constants';
import { MsgService } from '../msg.service';
import { UsersService } from '../usersService/users.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{
  @Input()
  requiredFileType: string = "all";

  @Input()
  fileName:string = "";

  @Input()
  type:string='0';

  @Input()
  tipo:string='0';

  @Input()
  elemId:string = "0";

  @Input()
  disabled:boolean = true;

  api:string = GlobalConstants.api;

  constructor(private http: HttpClient, private msg:MsgService,private userService:UsersService,public confirm: MatDialog) {

   
  }
  ngOnInit(): void {
    if(this.fileName == ""){this.fileName = "Upload " + this.requiredFileType.toUpperCase() + " file";}
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {

      console.log(this.api+this.type+this.elemId);


        this.fileName = file.name;

        const fd= new FormData();
        fd.append('file',file, file.name);

        const upload$ = this.http.post(this.api+this.type+this.elemId, fd);

        /*upload$.subscribe((data:any)=>{
          
          let orden:Number = +this.elemId;
          this.msg.sendText(data.url,orden,+this.tipo);
        }, error => {
          //console.log(error);
          this.userService.logout();
        });
       */

        upload$.subscribe({
          next: this.handleUpdateResponse.bind(this),
          error: this.handleError.bind(this)
       });

    }     
    
  }


  removeFile(){

    if(this.fileName !="Upload " + this.requiredFileType.toUpperCase() + " file" && this.fileName != "" )
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this image.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        console.log(this.api + " - " +this.type+" - "+this.elemId);
          let orden:Number = +this.elemId;
          this.msg.sendText('',orden,+this.tipo);
          this.fileName = "Upload " + this.requiredFileType.toUpperCase() + " file";
      }
    });
   

    /*const upload$ = this.http.delete(this.api+this.type+this.elemId);

    upload$.subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
   });*/
  }

  handleUpdateResponse(data:any){
    let orden:Number = +this.elemId;
    this.msg.sendText(data.url,orden,+this.tipo);
  }
  handleError(error:any){
    //console.log(error);
          this.userService.logout();
  }

}
