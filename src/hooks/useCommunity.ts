import { useEffect, useState } from "react";
import {
  getPosts,
  getPost,
  getComments,
  createPost,
  createComment,
  PostWithAuthor,
  CommentWithAuthor,
  PostInsert,
  CommentInsert,
  PostCategory,
} from "../services/community";

/**
 * 게시글 목록을 관리하는 훅
 */
export function usePosts(category?: PostCategory, limit: number = 20) {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPosts(category, limit);
      setPosts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [category, limit]);

  const refresh = () => loadPosts();

  const create = async (post: PostInsert) => {
    try {
      const newPost = await createPost(post);
      await refresh();
      return newPost;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    refresh,
    create,
  };
}

/**
 * 특정 게시글을 관리하는 훅
 */
export function usePost(postId: string | null) {
  const [post, setPost] = useState<PostWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPost = async () => {
    if (!postId) {
      setPost(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getPost(postId);
      setPost(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  const refresh = () => loadPost();

  return {
    post,
    loading,
    error,
    refresh,
  };
}

/**
 * 댓글 목록을 관리하는 훅
 */
export function useComments(postId: string | null) {
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadComments = async () => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getComments(postId);
      setComments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const refresh = () => loadComments();

  const create = async (comment: CommentInsert) => {
    try {
      const newComment = await createComment(comment);
      await refresh();
      return newComment;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    refresh,
    create,
  };
}
