import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { delay, retry, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BlogEntry } from '../models/blog-model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }
  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  blog:BlogEntry[]=[{
    id:null,
    title: "Blog...",
    description: "Blog description",
    short_desc: "Blog short desc",
    date: new Date()
  }]

  closeAllPanels() {
    this.panels.forEach(panel => {
            panel.close();
    });
  }


  openAllPanels() {
    this.panels.forEach(panel => {
            panel.open();
    });
  }

  newEntry(){
    this.blog = [...this.blog,{
      id:null,
      title: "",
      description: "",
      date: new Date()
    }]

  }

  deleteEntry(entry:BlogEntry){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this entry.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.blog = this.blog.filter((event) => event !== entry);
      } 
    });
  }

  fileUploaded(value:any){
    //console.log(value.msg, value.type);
    
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
