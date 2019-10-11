import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface UploadDialogData {
  confirm: string;
  displayText: string;
  extractedData: any;
}

@Component({
  selector: "app-upload-file-dialog",
  templateUrl: "./upload-file-dialog.component.html",
  styleUrls: ["./upload-file-dialog.component.scss"]
})
export class UploadFileDialogComponent implements OnInit {
  isDisabled: boolean = true;
  extractedData: any;
  constructor(
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDialogData
  ) {}

  ngOnInit() {}

  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = e => {
        let csv: any = reader.result;
        this.extractedData = reader;
        this.isDisabled = false;
        console.log(csv);
      };
    }
  }

  // public changeListener($event) : void {
  //   this.readThis($event.target);
  // }

  // readThis(inputValue: any) : void {
  //   var file:File = inputValue.files[0];
  //   var myReader:FileReader = new FileReader();

  //   myReader.onloadend = function(e){
  //     // you can perform an action with readed data here
  //     debugger;
  //     console.log(myReader.result);
  //   }

  //   myReader.readAsText(file);
  // }

  buttonClick(value) {
    let data = { confirm: value, extractedData: this.extractedData };
    this.dialogRef.close(data);
  }
}
