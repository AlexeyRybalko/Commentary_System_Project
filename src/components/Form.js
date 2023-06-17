"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Form {
    constructor(formSelector, user, handleSubmit) {
        this.formElement = document.querySelector(formSelector);
        this.user = user;
        this.input = this.formElement.querySelector('.comment-form__box-bottom_input');
        this.handleSubmit = handleSubmit;
        this.commentInfo = this.formElement.querySelector('.comment-form__box-top-left_info');
        this.submitButton = this.formElement.querySelector('.comment-form__box-bottom_send-button');
        this.commentError = this.formElement.querySelector('.comment-form__box-top-right_error');
        this.maxInputLength = 1000;
    }
    getData() {
        const { nickname, avatar } = this.user;
        return {
            id: Date.now(),
            nickname: nickname,
            avatar: avatar,
            date: Date.now(),
            text: this.input.value,
            rating: 0,
            isFavorites: false,
            isPlusPressed: false,
            isMinusPressed: false,
            replies: [],
        };
    }
    setEventListeners() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.input.style.height = '0';
            if (!this.input.value.trim()) {
                return;
            }
            ;
            this.handleSubmit(this.getData());
            this.formElement.reset();
            this.commentInfo.textContent = 'Макс. 1000 символов';
            this.submitButton.disabled = true;
        });
        this.input.addEventListener('input', (evt) => {
            if (!(evt.target instanceof HTMLInputElement)) {
                return;
            }
            const value = evt.target.value;
            this.input.style.height = '0';
            this.input.style.height = this.input.scrollHeight + "px";
            this.commentInfo.textContent = `${value.length}/${this.maxInputLength}`;
            if (value.length > this.maxInputLength) {
                this.commentInfo.style.color = '#FF0000';
                this.commentInfo.style.opacity = '1';
                this.commentError.style.display = 'flex';
                this.submitButton.disabled = true;
            }
            else if (!value.trim()) {
                this.submitButton.disabled = true;
            }
            else if (value.length <= this.maxInputLength) {
                this.commentInfo.style.color = '#000';
                this.commentInfo.style.opacity = '0.4';
                this.commentError.style.display = 'none';
                this.submitButton.disabled = false;
            }
        });
    }
}
exports.default = Form;
