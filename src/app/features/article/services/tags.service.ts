import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, map } from "rxjs";

@Injectable({ providedIn: "root"})

export class TagService{
    constructor(private readonly http: HttpClient){}

    getAll(): Observable<string[]>{
        return this.http
        .get<{tags: string[]}>("/tags")
        .pipe(map((data) => data.tags))
    }
}