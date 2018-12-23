import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface BlogMeta {
  urlsafe: string;
  title: string;
  lastModified: string;
}

export interface Blog {
  title: string;
  content: string;
  last_modified: string;
}

@Injectable({
  providedIn: 'root'
})
export class GaeBlogService {

  private _endpoint = 'https://davidshen84.appspot.com/blog/resources';

  constructor(private httpClient: HttpClient) {
  }

  public getBlogs() {
    return this.httpClient.get<BlogMeta[]>(`${this._endpoint}/blogs`);
  }

  public getBlog(urlsafe: string) {
    return this.httpClient.get<Blog>(`${this._endpoint}/blogs/${urlsafe}`);
  }
}
