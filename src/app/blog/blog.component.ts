import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { delay, retry, Subscription } from 'rxjs';
import { ApiBlogService } from '../api_connection/api_blog/api-blog.service';
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
  hideRequiredControl = new FormControl(false);
  public constructor(public confirm: MatDialog,public errorDialog: MatDialog,  private msg_service:MsgService, private blogService:ApiBlogService){
    //this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
    this.subs = this.msg_service.getText().subscribe((data:any)=>{
      let prom = this.blog.find(f=>f.id == data.type); 

      if(prom){
        if(data.tipo == 0){
          prom.thumb = data.msg;

        }
        else {
          prom.image = data.msg;
        }

        this.changeBlog(prom);
      }
    });

    this.blogService.getAllBlog().subscribe((data:BlogEntry[]) => {
      this.blog = data;
    });


  }
  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  blog:BlogEntry[]=[];

  closeAllPanels() {
    this.panels.forEach(panel => {
            panel.close();
    });
  }

  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
  }
  openAllPanels() {
    this.panels.forEach(panel => {
            panel.open();
    });
  }

  async newEntry(){

    var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      let fecha = yyyy + '-' + mm + '-' + dd;

    let entry :BlogEntry= {
      id: 0,
      title: "",
      title_it:"",
      date:fecha,
      shortDescription: "",
      shortDescription_it: "",
      image: "",
      thumb:"",
      description: "",
      description_it: "",
      highlight:false,

    };
    this.blog = [...this.blog,entry];
    /*await this.blogService.postBlog(entry).subscribe((data:BlogEntry)=>{

      this.blog = [...this.blog,{
        id: data.id,
        title: data.title,
        title_it:data.title_it,
        date:fecha,
        shortDescription: data.shortDescription,
        shortDescription_it: data.shortDescription_it,
        image: data.image,
        thumb:data.thumb,
        description: data.description,
        description_it: data.description_it,
        highlight:data.highlight,
      }];
  
    });*/
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
        this.blogService.deleteReach(entry.id).subscribe();
      } 
    });
  }


  saveBlog(s:BlogEntry){
    if(s.description_it == null) {s.description_it="";}
    if(s.shortDescription_it == null) {s.shortDescription_it="";}
    if(s.title_it == null) {s.title_it="";}

    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this blog.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;
   
   if(s.title == ""){errorSave =true;}
   if(s.title_it == ""){errorSave = true;}
   if(!errorSave){
       if(s.id == 0 ){

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
  
        let fecha = yyyy + '-' + mm + '-' + dd;

        this.blogService.postBlog(s).subscribe((data:BlogEntry)=>{
           s = data;
           s.date = fecha;
         });
       }
       else{
        this.blogService.putBlog(s).subscribe();
       }
   }
   else{
     this.errorDialog
   .open(ConfirmDialogComponent, {
     data: 'You need to enter all required fields.'
   })
   }
     } 
   });

 }

  fileUploaded(value:any){
    //console.log(value.msg, value.type);
    
  }

  changeBlog(s:BlogEntry){
    if(s.description_it == null) {s.description_it="";}
    if(s.shortDescription_it == null) {s.shortDescription_it="";}
    if(s.title_it == null) {s.title_it="";}

    //this.blogService.putBlog(s).subscribe();
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
