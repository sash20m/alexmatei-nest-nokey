export class BooksModel {
  constructor(
    public title: string,
    public author: string,
    public coverUrl: string,
    public postUrl?: string,
  ) {}
}
