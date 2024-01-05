import {Component, OnDestroy, signal} from '@angular/core';
import {ApiRoutesService} from "../../api-routes/api-routes.service";
import {HttpClientModule} from '@angular/common/http';
import {RbPost} from "../../components/post/post.component";
import {RbBlogCategory} from "../../components/blog-categories/blog-category.component";
import {ActivatedRoute} from "@angular/router";
import {PostInterface} from "../../interface/interface";
import {RbSlider} from "../../components/slider/slider.component";
import {NgIf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'blog',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  imports: [HttpClientModule, RbPost, RbBlogCategory, RbSlider, NgIf],
  standalone: true
})

export class BlogPostComponent implements OnDestroy{

  postData:any = signal<PostInterface[]>([])
  sliderData:any = signal<PostInterface[]>([])

  private destroy$ = new Subject<void>();

  load = false
  constructor(private apiRoutesService: ApiRoutesService, private route: ActivatedRoute) {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = +params['id'];
      this.apiRoutesService.getBlog(id).pipe(takeUntil(this.destroy$)).subscribe(
        (res: PostInterface[]) => {
          this.postData = res
        },
        (error) => {
          console.error('Error:', error);
        }
      );
      this.apiRoutesService.getBlogs().pipe(takeUntil(this.destroy$)).subscribe(
        (res: PostInterface[]) => {
          this.sliderData = res
          this.load = true
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
