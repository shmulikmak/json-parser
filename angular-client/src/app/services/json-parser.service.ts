import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class JsonParserService {

  constructor(private http: HttpClient) { }

  /**
   * Get original url
   */
  getFilesName() {
    return this.http.get(`/api/v1/jsonParser`);
  }

  getTablesName(fileName) {
    return this.http.get(`/api/v1/TableName?fileName=${fileName}`);
  }

  getTableInfo(tableIndex) {
    return this.http.get(`/api/v1/TabelInfo?tableIndex=${tableIndex}`);
  }

}
