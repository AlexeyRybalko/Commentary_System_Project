import Commentary from "./Commentary";
import { Comment } from "../index";

export default class Reply extends Commentary {
    repliedUser: string;

    constructor(selectorTemplate: string, comment: Comment, repliedUser: string) {
        super(selectorTemplate, comment);
        this.repliedUser = repliedUser;
    }

    fillData() {
        super.fillData();
        const replyContainer = document.createElement('div');
        replyContainer.className = 'reply-nickname-container';

        const replyArrow = document.createElement('img');
        replyArrow.src = './svg/answer-left.svg';
        replyArrow.className = 'response-button responsed-button';
        replyArrow.alt = 'left-arrow';

        const repliedNickname = document.createElement('span');
        repliedNickname.textContent = this.repliedUser;
        repliedNickname.className = 'replied-nickname'; 
        
        this.item.querySelector('.favorite-button')!.className = 'favorite-button favorite-button_replied';
        replyContainer.append(replyArrow, repliedNickname);
        this.item.querySelector('.comment-form__box-top-left_nickname')!.after(replyContainer);
        this.item.firstElementChild!.classList.add('comment-template-item_reply'); 
        this.item.querySelector('.comment-feed__interact_response')!.remove();

        
    }
}