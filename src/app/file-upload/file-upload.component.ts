import { HttpClient} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input()
  requiredFileType: string = "all";

  @Input()
  fileName:string = "";

  @Input()
  type:string='0';

  constructor(private http: HttpClient, private msg:MsgService) {}

  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
        let orden:Number = +this.type;
        this.msg.sendText(this.fileName,orden);
    }         
  }

}
