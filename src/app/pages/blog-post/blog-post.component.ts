import {Component, Input, signal} from '@angular/core';
import {ApiRoutesService} from "../../api-routes/api-routes.service";
import {HttpClientModule} from '@angular/common/http';
import {RbPost} from "../../components/post/post.component";
import {CategoryInterface, PostInterface} from "../../interface/interface";
import {RbBlogCategory} from "../../components/blog-categories/blog-category.component";




@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [HttpClientModule, RbPost, RbBlogCategory],
  standalone: true
})
export class BlogComponent {
  categoryData:any = signal<CategoryInterface[]>([])

  postData:any = signal<PostInterface[]>([])
  constructor(private apiRoutesService: ApiRoutesService) {
    this.getToken()
  }


  getToken() {
    this.apiRoutesService.getToken().subscribe(
      (token: any) => {
        console.log('Token:', token);
          this.apiRoutesService.getBlogs().subscribe(
            (res: any) => {
              console.log('Token:', res);
              this.postData = res
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        this.apiRoutesService.getCategories().subscribe(
          (res: any) => {
            console.log('Token:', res);
            this.categoryData = res
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


}
