"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentSection_1 = __importDefault(require("./components/CommentSection"));
const config_1 = require("./utils/config");
const Commentary_1 = __importDefault(require("./components/Commentary"));
const Form_1 = __importDefault(require("./components/Form"));
const Reply_1 = __importDefault(require("./components/Reply"));
const commentCounter = document.querySelector('.comments-counter__text_number');
const form = new Form_1.default('.comment-form', config_1.user, handleCommentSubmit);
function handleCommentSubmit(comment) {
    commentList.comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(commentList.comments));
    createComment(comment);
    commentCounter.textContent = `(${++commentList.commentCounter})`;
}
const commentList = new CommentSection_1.default(config_1.comments, ".comment-feed", createComment);
commentList.renderComments(commentList.sortComments());
commentList.setListeners();
commentList.commentCount(commentCounter);
form.setEventListeners();
function createComment(comment) {
    const newComment = new Commentary_1.default(".comment-template", comment, handleReply);
    comment.replies.sort((a, b) => b.date - a.date);
    comment.replies.forEach(reply => {
        createReply(reply, newComment);
    });
    commentList.addComment(newComment.render());
}
function createReply(reply, newComment) {
    const newReply = new Reply_1.default(".comment-template", reply, newComment.comment.nickname);
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
