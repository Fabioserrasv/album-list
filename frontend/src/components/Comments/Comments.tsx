import { useEffect, useState, useCallback } from 'react';
import { Comment as CommentEntity } from "../../entities/comment";
import { createDatabase } from "../../utils/database-in-memory/database"
import { ID } from '../../entities/app-types';
import { CardComment } from './CardComment';

import "./comments-styles.css";
import { InputComment } from './InputComment';


type CommentSimplifyInteraction = "LIKE" | "DESLIKE";

type CommentSimplify = {
	id: ID;
  text: string;
  likes: number;
  deslikes: number;
  user: {
    username: string;
    userPic: string;
  }
	interaction: CommentSimplifyInteraction | null;
  replies: ID[];
}


type CommentProps = {
  commentId: ID;
}

type CommentsProps = {
  comments: CommentEntity[];
}


type CreateCommentsProps = {
	onAddComment(commentParentId: ID | null, text: string): Promise<CommentEntity>;
	onInteraction(commentId: ID, interaction: CommentSimplifyInteraction): Promise<void>;
}

function convertInteraction(intention: CommentEntity["intention"]): CommentSimplifyInteraction|null{
	if (intention === 0) return null;

	return intention === 1 ? "LIKE" : "DESLIKE";
}

export function createComments({
	onAddComment,
	onInteraction
}: CreateCommentsProps) {
	const commentDB = createDatabase<CommentSimplify>();

	function initializeCommentsInDB(comments: CommentEntity[])	{
		for (let i = 0; i < comments.length; i++) {
			const comment = comments[i];
			commentDB.instance.set({
				id: comment.id,
				deslikes: comment.deslikes,
				likes: comment.likes,
				text: comment.text,
        user: {
          username: comment.username,
          userPic: comment.userPic || "", 
        },
				interaction: convertInteraction(comment.intention),
				replies: comment.replies.map(reply => reply.id)
			});

			initializeCommentsInDB(comment.replies);
		}
	}

	function Comment({ commentId }: CommentProps) {
		const [isOpenReplyInput, setIsOpenReplyInput] = useState(false);
		const [comment, setComment] = useState(commentDB.instance.get(commentId));

		useEffect(() => {
			return commentDB.instance.onAfterAdd(({ value: comment }) => {
				if (comment.id !== commentId) {
					return;
				}

				setComment(comment);
			});
		}, [commentId]);

		const handleAddComment = useCallback(async (text: string) => {
			if (!comment?.replies) {
				return;
			}

			const newComment = await onAddComment(comment.id, text);

			commentDB.instance.set({
				id: newComment.id,
				deslikes: newComment.deslikes,
				likes: newComment.likes,
				text: newComment.text,
        user: {
          username: newComment.username,
          userPic: "12", 
        },
				interaction: null,
				replies: newComment.replies.map(reply => reply.id)
			});

			const newReplies = [newComment.id, ...comment.replies];
			commentDB.instance.update(commentId, {
				replies: newReplies
			});
		}, [commentId, comment?.replies]);

    const handleToggleInteraction = useCallback(async (interaction: CommentSimplifyInteraction) => {
      if (!comment?.user) {
        return;
      }

			await onInteraction(comment.id, interaction)

			commentDB.instance.update(commentId, {
				interaction: comment.interaction === interaction ? null : interaction
			});
		}, [commentId, comment?.interaction])


		const handleToggleLike = useCallback(
      () => handleToggleInteraction("LIKE"),
      [handleToggleInteraction]
    );

    const handleToggleDeslike = useCallback(
      () => handleToggleInteraction("DESLIKE"),
      [handleToggleInteraction]
    )

		const openReplyInput = useCallback(() => setIsOpenReplyInput(true), []);
		const closeReplyInput = useCallback(() => setIsOpenReplyInput(false), []);

		if (!comment) {
			return <>loading..</>
		}

    
		const likes = comment.interaction === "LIKE" ? comment.likes + 1 : comment.likes;
		const deslikes = comment.interaction === "DESLIKE" ? comment.deslikes + 1 : comment.deslikes;

		return (
			<div className="comment">
				<CardComment
					interaction={comment.interaction}
					deslikes={deslikes}
					likes={likes}	
					text={comment.text}
					username={comment.user.username}
					userPic={comment.user.userPic}
					onDeslike={handleToggleDeslike}
					onLike={handleToggleLike}
					onReply={openReplyInput}
				/>
				<InputComment
					isOpen={isOpenReplyInput}
					onAddComment={handleAddComment}
					onCancel={closeReplyInput}
				/>
				<div className="sub-comments">
					{comment.replies.map((replyId) => (
						<Comment
							key={replyId}
							commentId={replyId}
						/>
					))}
				</div>
			</div>
		)
	}

	function Comments({ comments }: CommentsProps) {
		const [commentRootIds, setCommentRootIds] = useState<ID[]>([]);

		useEffect(() => {
			initializeCommentsInDB(comments);
			setCommentRootIds(comments.map(comment => comment.id));
		}, [comments]);

		const handleAddComment = useCallback(async (text: string) => {
			

			const newComment = await onAddComment(null, text);

			commentDB.instance.set({
				id: newComment.id,
				deslikes: newComment.deslikes,
				likes: newComment.likes,
				text: newComment.text,
        user: {
          username: newComment.username,
          userPic: "12", 
        },
				interaction: null,
				replies: newComment.replies.map(reply => reply.id)
			});

			setCommentRootIds(commentRootIds => [newComment.id, ...commentRootIds])
		}, []);


		return (
			<> 
				<div>
					<InputComment
						isOpen={true}
						onAddComment={handleAddComment}
					/>
				</div>
				<div className="comments">
					{commentRootIds.map((commentRootId) => (
						<Comment
							key={commentRootId}
							commentId={commentRootId}
						/>
					))}
				</div>
			</>
		)
	}

	return Comments;
}