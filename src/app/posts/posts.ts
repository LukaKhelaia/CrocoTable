import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../Services/user.model';
import { Post } from '../Services/post.model';
import { GetDataService } from '../Services/get-data-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.html',
  styleUrls: ['./posts.css']
})
export class Posts implements OnInit{

  posts: Post[] = [];
  users: User[] = [];
  selectedPost: Post | null = null;
  filteredPosts: Post[] = []
 

  constructor(private api: GetDataService, private route: ActivatedRoute) {}

  //Get users posts
  ngOnInit(): void {
    this.api.getUsers().subscribe(usersData => {
      this.users = usersData;

      this.api.getPosts().subscribe(postsData => {
        this.posts = postsData;

        //check query params to filter the posts by user
        this.route.queryParams.subscribe(params => {
          const userId = params['userId'];
          if(userId) {
            this.filteredPosts = this.posts.filter(post => post.userId === +userId);
          } else {
            this.filteredPosts = this.posts;
          }
        })
      })
    })
  }

  //Find posts author
  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown user';
  }

  //To display the users post
  openPost(post: Post) {
    this.selectedPost = post;
  }

  //To close the users post
  closePost() {
    this.selectedPost = null;
  }

}
