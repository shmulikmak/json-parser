import { Component } from '@angular/core';
import { JsonParserService } from './services/json-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  filesName;
  tabelName;
  tabelIndex;

  constructor(private jsonParserService: JsonParserService) {
    this.getFilesName();
  }

  async getFilesName() {
    this.filesName = await this.jsonParserService.getFilesName().toPromise();
  }

  async getTables(tabelName) {
    this.tabelName = null;
    this.tabelIndex = null;
    this.tabelName = await this.jsonParserService.getTablesName(tabelName).toPromise();
  }

  async getTableInfo(tabelIndex) {
    this.tabelIndex = await this.jsonParserService.getTableInfo(tabelIndex).toPromise();
  }

}
