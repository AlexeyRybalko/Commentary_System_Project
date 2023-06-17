import CommentSection from "./components/CommentSection.js";
import { comments, user } from "./utils/config.js";
import Commentary from "./components/Commentary.js";
import Form from "./components/Form.js";
import Reply from "./components/Reply.js";
const commentCounter = document.querySelector('.comments-counter__text_number');
const form = new Form('.comment-form', user, handleCommentSubmit);
function handleCommentSubmit(comment) {
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
function createComment(comment) {
    const newComment = new Commentary(".comment-template", comment, handleReply);
    comment.replies.sort((a, b) => b.date - a.date);
    comment.replies.forEach(reply => {
        createReply(reply, newComment);
    });
    commentList.addComment(newComment.render());
}
function createReply(reply, newComment) {
    const newReply = new Reply(".comment-template", reply, newComment.comment.nickname);
    newComment.item.append(newReply.render());
}
function handleReply(commentaryInstance) {
    form.handleSubmit = (reply) => {
        createReply(reply, commentaryInstance);
        commentaryInstance.comment.replies.push(reply);
        localStorage.setItem('comments', JSON.stringify(commentList.comments));
        commentList.renderComments(commentList.sortComments());
        form.handleSubmit = handleCommentSubmit;
        commentCounter.textContent = `(${++commentList.commentCounter})`;
    };
    form.formElement.scrollIntoView();
    form.input.focus();
}
