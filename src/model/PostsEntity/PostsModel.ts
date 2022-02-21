export class PostsModel {
  constructor(
    public title: string,
    public text: string,
    public coverUrl: string,
    public isBookEssay: boolean,
    public likeNumber: number,
  ) {}
}
