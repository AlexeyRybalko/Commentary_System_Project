import { Comment } from "../index.js";

interface CommentData {
    isMinusPressed: boolean,
    isPlusPressed: boolean,
    id: number,
    rating: number,
    isFavorites: boolean,
}

export default class Commentary {
    commentTemplate: HTMLTemplateElement;
    comment: Comment;
    item: Element;
    handleReply?: (commentaryInstance: Commentary) => void;
    ratingCounter: HTMLElement;
    favoritesButtonText: HTMLElement;
    favoritesButton: HTMLElement;
    plusButton: HTMLElement;
    minusButton: HTMLElement;

    constructor(selectorTemplate: string, comment: Comment, handleReply?: (commentaryInstance: Commentary) => void) {
        this.commentTemplate = document.querySelector(selectorTemplate) as HTMLTemplateElement;
        this.comment = comment;
        this.item = this.commentTemplate.content.cloneNode(true) as Element;
        this.handleReply = handleReply;
        this.minusButton = this.item.querySelector(".rating-minus") as HTMLElement;
        this.plusButton = this.item.querySelector('.rating-plus') as HTMLElement;
        this.favoritesButton = this.item.querySelector('.favorite-icon') as HTMLElement;
        this.favoritesButtonText = this.item.querySelector('.favorite-button__text') as HTMLElement;
        this.ratingCounter = this.item.querySelector('.rating-counter') as HTMLElement;
    }

    fillData() { 
        const storage = JSON.parse(localStorage.getItem('valueStorage') as string) || [];

        storage.forEach((el: CommentData) => {
            if (this.comment.id === el.id) {
                this.comment.isFavorites = el.isFavorites;
                this.comment.rating = el.rating;
                this.comment.isPlusPressed = el.isPlusPressed;
                this.comment.isMinusPressed = el.isMinusPressed;
            }
        });

        this.item.querySelector(".comment-form__box-top-left_nickname")!.textContent = this.comment.nickname;
        this.item.querySelector(".comment-form__box-top_date")!.textContent = this.getDate();
        this.item.querySelector(".comment-feed__text")!.textContent = this.comment.text;
        (this.item.querySelector('.comment-form__avatar-pic') as HTMLImageElement).src = this.comment.avatar;
        (this.item.querySelector('.comment-feed__avatar-pic') as HTMLImageElement).src = this.comment.avatar;
        this.ratingCounter.textContent = this.comment.rating.toString();
        if (this.comment.isFavorites) {
            this.favoritesButton.classList.toggle('favorite-icon-pressed');
            this.favoritesButtonText.textContent = 'В избранном';
        }
        this.changeRatingColor();

        if (this.comment.isMinusPressed) {

            this.minusButton.style.opacity = '30%';
            this.plusButton.style.opacity = '100%';
        } else if (this.comment.isPlusPressed) {
            this.plusButton.style.opacity = '30%';
            this.minusButton.style.opacity = '100%';
        }
    }

    render() {
        this.setListeners();
        this.fillData();
        return this.item;
    }

    getDate() {
        const date = new Date(this.comment.date);
        const day = this.formatDate(date.getDate());
        const month = this.formatDate(date.getMonth() + 1); // Изначально выводил на один месяц меньше (05). Поэтому "+1"
        const hours = this.formatDate(date.getHours());
        const minutes = this.formatDate(date.getMinutes());
        const formatedDate = `${day}.${month} ${hours}:${minutes}`;
        return formatedDate;
    }

    formatDate(date: number) {
        return date < 10 ? `0${date}` : date;
    }

    setListeners() {
        const replyButton = this.item.querySelector('.response-button') as Element;

        this.minusButton.addEventListener('click', () => {
            this.decreaseRating();
        });

        this.plusButton.addEventListener('click', () => {
            this.increaseRating();
        });

        this.favoritesButton.addEventListener('click', () => {
            this.addFavorite();
        });

        this.favoritesButtonText.addEventListener('click', () => {
            this.addFavorite();
        })

        replyButton.addEventListener('click', () => {
            this.handleReply!(this); 
        })
    }

    getCommentData() {
        return {
            isMinusPressed: this.comment.isMinusPressed, 
            isPlusPressed: this.comment.isPlusPressed, 
            id: this.comment.id, 
            rating: this.comment.rating,
            isFavorites: this.comment.isFavorites,
        }
    }

    addFavorite() {
        this.favoritesButton.classList.toggle('favorite-icon-pressed')

        this.favoritesButtonText.textContent = this.comment.isFavorites ? 'В избранное' : 'В избранном';
        this.comment.isFavorites = !this.comment.isFavorites;

        this.setLocalStorage();
    }

    setLocalStorage() {
        let storage = JSON.parse(localStorage.getItem('valueStorage') as string) || [];

        if (storage.length) {
            storage = storage.filter((el: CommentData) => {
                return this.comment.id !== el.id;
            });
        }

        storage.push(this.getCommentData());
        localStorage.setItem('valueStorage', JSON.stringify(storage));
    }

    changeRatingColor() {
        switch (true) {
            case (this.comment.rating < 0):
                this.ratingCounter.style.color = '#f96464';
                break;
            case (this.comment.rating === 0):
                this.ratingCounter.style.color = '#cbc3c3';
                break;
            case (this.comment.rating > 0):
                this.ratingCounter.style.color = '#8AC540';
                break;
            default:
                return;
        }
    }

    changeRating() {
        this.ratingCounter.textContent = this.comment.rating.toString();

        this.changeRatingColor();

        this.setLocalStorage();
    }

    decreaseRating() {
        if (this.comment.isMinusPressed) {
            return;
        }

        --this.comment.rating;

        if (this.comment.isPlusPressed) {
            this.comment.isPlusPressed = false;
            this.plusButton.style.opacity = '100%';
        } else {
            this.comment.isMinusPressed = true;
            this.minusButton.style.opacity = '30%';
        }

        this.changeRating();
    }

    increaseRating() {
        if (this.comment.isPlusPressed) {
            return;
        }

        ++this.comment.rating;
        
        if (this.comment.isMinusPressed) {
            this.comment.isMinusPressed = false; 
            this.minusButton.style.opacity = '100%';
        } else {
            this.comment.isPlusPressed = true;
            this.plusButton.style.opacity = '30%';
        }

        this.changeRating();
    }
}