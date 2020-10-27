export const getSocialLink = (name, link, title, id?) => {
    let socialLink;
    if (link) {
        switch (name) {
            case 'whatsapp':
                socialLink = `https://api.whatsapp.com/send?text=${link}`;
                break;
            case 'facebook':
                socialLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
                break;
            case 'linkedin':
                socialLink = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;
                break;
            case 'twitter':
                const text  = `I shared my feedback on ` +
                `${title}, support me and share your feedback on %23Civis today!`;
                const url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
                socialLink = id ? url + `%23${id}` : url;
                break;
        }
    }
    return socialLink;
};
