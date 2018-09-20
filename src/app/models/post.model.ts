export class Post {
    constructor(public authorName:string , public content:string , public date:Date , public postId? , public userId?: string) {}
}