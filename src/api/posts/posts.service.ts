import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Posts } from 'src/model/PostsEntity/posts.entity';
import { PostsModel } from 'src/model/PostsEntity/PostsModel';
import { Repository } from 'typeorm';
import { map, catchError } from 'rxjs/operators';

interface Tweet {
  id: string;
  text: string;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private httpService: HttpService,
  ) {}

  addPost({ title, text, coverUrl, isBookEssay }): Promise<PostsModel> {
    const newPost = new PostsModel(title, text, coverUrl, isBookEssay, 0);

    return this.postsRepository.save(newPost);
  }

  getPosts(): Promise<PostsModel> {
    return this.postsRepository.query(`
    SELECT * FROM posts
    ORDER BY posts.created_at
    `);
  }

  async likePost(id) {
    const currentPost = await this.postsRepository.findOne(id);
    if (!currentPost) throw new BadRequestException('Non existent post');
    const newLikesCount = currentPost.likeNumber + 1;
    try {
      this.postsRepository.query(`
    UPDATE "posts" SET "likeNumber" = ${newLikesCount}
    WHERE id=${id};
    `);
    } catch (error) {
      throw new BadRequestException();
    }

    return { message: 'Post liked successful' };
  }

  getPost(id) {
    return this.postsRepository.findOne(id);
  }

  public async editPost(data) {
    const { id } = data;

    const oldPost = await this.postsRepository.findOne({ id });

    const post = await this.postsRepository.save({
      ...oldPost,
      ...data,
    });

    return post;
  }

  deletePost(id) {
    return this.postsRepository.delete(id);
  }

  getTweets(id: string = null): Observable<any> {
    const token =
      'AAAAAAAAAAAAAAAAAAAAAJkJNwEAAAAAa7LP5Ite0Jh8Tz377Qr2Baaemgs%3DcYqiwiVH6cUIEsEvi0PVaSrqB1sWIcyHl2VwR9aaZjxWDoJq7c';

    const intId = parseInt(id);

    const data = this.httpService
      .get(
        `https://api.twitter.com/2/users/${
          !intId || intId < 1 || intId > 3000000000 ? '1395097226' : id
        }/tweets?exclude=replies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(map((response) => response.data));

    return data;
  }

  getTwitterUser(): Observable<any> {
    const token =
      'AAAAAAAAAAAAAAAAAAAAAJkJNwEAAAAAa7LP5Ite0Jh8Tz377Qr2Baaemgs%3DcYqiwiVH6cUIEsEvi0PVaSrqB1sWIcyHl2VwR9aaZjxWDoJq7c';

    const user = this.httpService
      .get('https://api.twitter.com/2/users/by/username/alex_matei20', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));

    return user;
  }
}
