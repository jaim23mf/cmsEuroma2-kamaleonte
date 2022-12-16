import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ReachService } from '../api_connection/api_reach/reach.service';
import { GlobalConstants } from '../common/global-constants';
import { MsgService } from '../msg.service';
import { UsersService } from '../usersService/users.service';

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

  api:string = GlobalConstants.api;

  constructor(private http: HttpClient, private msg:MsgService,private userService:UsersService) {

   
  }
  ngOnInit(): void {
    if(this.fileName == ""){this.fileName = "Upload " + this.requiredFileType.toUpperCase() + " file";}
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {

      console.log(this.elemId);


        this.fileName = file.name;

        const fd= new FormData();
        fd.append('file',file, file.name);

        const upload$ = this.http.post(this.api+this.type+this.elemId, fd);

        upload$.subscribe((data:any)=>{
          
          console.log(data)
          let orden:Number = +this.elemId;
          this.msg.sendText(data.url,orden,+this.tipo);
        });
       
    }         
  }

}
