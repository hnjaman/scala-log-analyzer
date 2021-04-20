import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestDataForm } from './model/log.model';

const host = "http://localhost:9000";

@Injectable({
    providedIn: 'root'
})
export class RestService {
    
    constructor(private http: HttpClient) {}

    loadData(requestDataForm: RequestDataForm): any {
        return this.http.post(host+"/api/data", requestDataForm, { observe: 'response' })
    }

    loadHistogram(requestDataForm: RequestDataForm): any {
        return this.http.post(host+"/api/histogram", requestDataForm, { observe: 'response' })
    }

    getFileSize(): any {
        return this.http.get(host+"/api/get_size", { observe: 'response' })
    }

    getFileStatus(): any {
        return this.http.get(host+"/api/get_status", { observe: 'response' })
    }
}