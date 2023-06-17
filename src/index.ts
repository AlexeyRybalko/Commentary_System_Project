import CommentSection from "./components/CommentSection";
import { comments, user } from "./utils/config";
import Commentary from "./components/Commentary";
import Form from "./components/Form";
import Reply from "./components/Reply";

const commentCounter = document.querySelector('.comments-counter__text_number') as Element;
const form = new Form('.comment-form', user, handleCommentSubmit)

export interface Comment {
    id: number,
    nickname: string,
    date: number,
    text: string,
    rating: number,
    isFavorites: boolean,
    isPlusPressed: boolean,
    isMinusPressed: boolean,
    avatar: string,
    replies: Array<Comment>,
}

function handleCommentSubmit(comment: Comment) {
    commentList.comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(commentList.comments));
    createComment(comment);
    commentCounter.textContent = `(${++commentList.commentCounter})`;
}

const commentList = new CommentSection(comments, ".comment-feed", createComment);
commentList.renderComments(commentList.sortComments());
commentList.setListeners();
commentList.commentCount(commentCounter);
form.setEventListeners();

function createComment(comment: Comment) {
    const newComment = new Commentary(".comment-template", comment, handleReply);

    comment.replies.sort((a, b) => b.date - a.date);
    comment.replies.forEach(reply => {
        createReply(reply, newComment); 
    });

    commentList.addComment(newComment.render());
}

function createReply(reply: Comment, newComment: Commentary) {
    const newReply = new Reply(".comment-template", reply, newComment.comment.nickname);
    newComment.item.append(newReply.render());
}

function handleReply(commentaryInstance: Commentary) {
    form.handleSubmit = (reply) => {
        createReply(reply, commentaryInstance);
        commentaryInstance.comment.replies.push(reply);
        localStorage.setItem('comments', JSON.stringify(commentList.comments));
        commentList.renderComments(commentList.sortComments());
        form.handleSubmit = handleCommentSubmit;
        commentCounter.textContent = `(${++commentList.commentCounter})`;
    }

    form.formElement.scrollIntoView();
    form.input.focus();
}