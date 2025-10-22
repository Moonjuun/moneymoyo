import { supabase } from "../lib/supabase";
import {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from "../lib/database.types";

export type Post = Tables<"posts">;
export type PostInsert = TablesInsert<"posts">;
export type PostUpdate = TablesUpdate<"posts">;
export type Comment = Tables<"comments">;
export type CommentInsert = TablesInsert<"comments">;
export type CommentUpdate = TablesUpdate<"comments">;
export type PostCategory = Enums<"post_category">;

/**
 * 게시글과 작성자 정보를 함께 조회하는 타입
 */
export interface PostWithAuthor extends Post {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

/**
 * 댓글과 작성자 정보를 함께 조회하는 타입
 */
export interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

/**
 * 게시글 목록 조회 (페이지네이션)
 */
export async function getPosts(
  category?: PostCategory,
  limit: number = 20,
  offset: number = 0
): Promise<PostWithAuthor[]> {
  let query = supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles!posts_author_id_fkey(id, username, avatar_url)
    `
    )
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category && category !== "general") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data || []) as PostWithAuthor[];
}

/**
 * 특정 게시글 조회
 */
export async function getPost(postId: string): Promise<PostWithAuthor> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles!posts_author_id_fkey(id, username, avatar_url)
    `
    )
    .eq("id", postId)
    .eq("is_deleted", false)
    .single();

  if (error) throw error;
  return data as PostWithAuthor;
}

/**
 * 게시글 작성
 */
export async function createPost(post: PostInsert): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 게시글 수정
 */
export async function updatePost(
  postId: string,
  updates: PostUpdate
): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", postId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 게시글 삭제 (소프트 삭제)
 */
export async function deletePost(postId: string): Promise<void> {
  const { error } = await supabase
    .from("posts")
    .update({ is_deleted: true, updated_at: new Date().toISOString() })
    .eq("id", postId);

  if (error) throw error;
}

/**
 * 게시글 조회수 증가
 */
export async function incrementViewCount(postId: string): Promise<void> {
  const post = await getPost(postId);
  await updatePost(postId, { view_count: post.view_count + 1 });
}

/**
 * 게시글의 댓글 목록 조회
 */
export async function getComments(
  postId: string
): Promise<CommentWithAuthor[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      author:profiles!comments_author_id_fkey(id, username, avatar_url)
    `
    )
    .eq("post_id", postId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data || []) as CommentWithAuthor[];
}

/**
 * 댓글 작성
 */
export async function createComment(comment: CommentInsert): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert(comment)
    .select()
    .single();

  if (error) throw error;

  // 게시글의 댓글 수 증가
  await incrementCommentCount(comment.post_id);

  return data;
}

/**
 * 댓글 수정
 */
export async function updateComment(
  commentId: string,
  updates: CommentUpdate
): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 댓글 삭제 (소프트 삭제)
 */
export async function deleteComment(commentId: string): Promise<void> {
  const comment = await getComment(commentId);

  const { error } = await supabase
    .from("comments")
    .update({ is_deleted: true, updated_at: new Date().toISOString() })
    .eq("id", commentId);

  if (error) throw error;

  // 게시글의 댓글 수 감소
  await decrementCommentCount(comment.post_id);
}

/**
 * 특정 댓글 조회
 */
async function getComment(commentId: string): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", commentId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * 게시글 댓글 수 증가
 */
async function incrementCommentCount(postId: string): Promise<void> {
  const post = await getPost(postId);
  await updatePost(postId, { comment_count: post.comment_count + 1 });
}

/**
 * 게시글 댓글 수 감소
 */
async function decrementCommentCount(postId: string): Promise<void> {
  const post = await getPost(postId);
  await updatePost(postId, {
    comment_count: Math.max(0, post.comment_count - 1),
  });
}
