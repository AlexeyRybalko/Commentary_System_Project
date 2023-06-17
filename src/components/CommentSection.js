"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentSection {
    constructor(comments, sectionSelector, createComment) {
        this.comments = JSON.parse(localStorage.getItem('comments')) || comments;
        this.commentSection = document.querySelector(sectionSelector);
        this.createComment = createComment;
        this.currentSort = 'date';
        this.fromGreaterToLesser = true;
        this.commentCounter = 0;
        this.isFavoriteComments = false;
    }
    commentCount(commentCounter) {
        this.commentCounter = this.comments.length;
        this.comments.forEach((comment) => {
            this.commentCounter += comment.replies.length;
        });
        commentCounter.textContent = `(${this.commentCounter})`;
    }
    renderComments(array) {
        this.commentSection.innerHTML = '';
        array.forEach(element => {
            this.createComment(element);
        });
    }
    addComment(comment) {
        this.commentSection.prepend(comment);
    }
    sortComments() {
        const favoriteComments = this.comments.filter(item => (item.isFavorites === true));
        const comments = this.isFavoriteComments ? favoriteComments : this.comments;
        switch (true) {
            case (this.currentSort === 'date' && this.fromGreaterToLesser):
                return comments.sort((a, b) => a.date - b.date);
            case (this.currentSort === 'rating' && this.fromGreaterToLesser):
                return comments.sort((a, b) => Math.abs(a.rating) - Math.abs(b.rating));
            case (this.currentSort === 'date' && !this.fromGreaterToLesser):
                return comments.sort((a, b) => b.date - a.date);
            case (this.currentSort === 'rating' && !this.fromGreaterToLesser):
                return comments.sort((a, b) => Math.abs(b.rating) - Math.abs(a.rating));
            case (this.currentSort === 'reply' && !this.fromGreaterToLesser):
                return comments.sort((a, b) => b.replies.length - a.replies.length);
            case (this.currentSort === 'reply' && this.fromGreaterToLesser):
                return comments.sort((a, b) => a.replies.length - b.replies.length);
            default:
                return comments;
        }
    }
    setListeners() {
        const filterButtonReverse = document.querySelector(".filter-button_reverse");
        const filterButtonReverseIcon = document.querySelector(".filter-icon");
        const filterButtonFavorites = document.querySelector('.filter-button_favorites');
        const filterSelectList = document.querySelector('.filter__select-list');
        const selectButton = document.querySelector('.select-button');
        const filterSelectListItems = filterSelectList.querySelectorAll('.filter__select-list-item');
        filterButtonReverse.addEventListener('click', () => {
            this.fromGreaterToLesser = !this.fromGreaterToLesser;
            filterButtonReverseIcon.classList.toggle('reversed');
            this.renderComments(this.sortComments());
        });
        filterButtonFavorites.addEventListener('click', () => {
            this.isFavoriteComments = !this.isFavoriteComments;
            this.renderComments(this.sortComments());
        });
        selectButton.addEventListener('click', () => {
            filterSelectList.classList.toggle('active');
        });
        filterSelectListItems.forEach((item) => {
            item.addEventListener('click', (evt) => {
                if (!(evt.target instanceof HTMLElement)) {
                    return;
                }
                filterSelectList.querySelector('.item-active').classList.remove('item-active');
                evt.target.classList.add('item-active');
                selectButton.textContent = evt.target.textContent;
                this.currentSort = evt.target.dataset.value;
                this.fromGreaterToLesser = true;
                filterButtonReverseIcon.classList.remove('reversed');
                this.renderComments(this.sortComments());
            });
        });
        document.addEventListener('click', (evt) => {
            if (evt.target !== selectButton) {
                filterSelectList.classList.remove('active');
            }
        });
    }
}
exports.default = CommentSection;
