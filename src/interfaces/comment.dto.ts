export interface createCommentDto {
  password: string;
  content: string;
  postId: string;
}

export interface updateCommentDto {
  password: string;
  content: string;
}

export interface deleteCommentDto {
  password: string;
}
