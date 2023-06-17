import { Comment } from "../index";

export default class CommentSection { 
    comments: Array<Comment>;   
    commentCounter: number;
    commentSection: Element;
    createComment: (comment: Comment) => void;
    currentSort: 'date' | 'rating' | 'reply';
    fromGreaterToLesser: boolean;
    isFavoriteComments: boolean;

    constructor(comments: Array<Comment>, sectionSelector: string, createComment: (comment: Comment) => void) {
        this.comments = JSON.parse(localStorage.getItem('comments') as string) || comments;
        this.commentSection = document.querySelector(sectionSelector) as Element;
        this.createComment = createComment;
        this.currentSort = 'date';
        this.fromGreaterToLesser = true;
        this.commentCounter = 0;
        this.isFavoriteComments = false;
    }

    commentCount(commentCounter: Element) {
        this.commentCounter = this.comments.length;

        this.comments.forEach((comment) => {
            this.commentCounter += comment.replies.length;
        });

        commentCounter.textContent = `(${this.commentCounter})`;
    }

    renderComments(array: Array<Comment>) {
        this.commentSection.innerHTML = '';

        array.forEach(element => {
            this.createComment(element)
        });
    }

    addComment(comment: Element) {
        this.commentSection.prepend(comment);
    }

    sortComments() {
        const favoriteComments = this.comments.filter(item => (item.isFavorites === true));
        const comments = this.isFavoriteComments ? favoriteComments : this.comments;

        switch(true) {
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
        const filterButtonReverse = document.querySelector(".filter-button_reverse") as Element;
        const filterButtonReverseIcon = document.querySelector(".filter-icon") as Element;
        const filterButtonFavorites = document.querySelector('.filter-button_favorites') as Element;
        const filterSelectList = document.querySelector('.filter__select-list') as Element;
        const selectButton = document.querySelector('.select-button') as Element;
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

                filterSelectList.querySelector('.item-active')!.classList.remove('item-active');
                evt.target.classList.add('item-active');

                selectButton.textContent = evt.target.textContent;

                this.currentSort = evt.target.dataset.value as typeof this.currentSort;

                this.fromGreaterToLesser = true;
                filterButtonReverseIcon.classList.remove('reversed');

                this.renderComments(this.sortComments());
            })
        });

        document.addEventListener('click', (evt) => {
            if (evt.target !== selectButton) {
                filterSelectList.classList.remove('active');
            } 
        });
    }
}

