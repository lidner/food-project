window.addEventListener('DOMContentLoaded', function () {

    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Modal window
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.toggle('show');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Class based menu cards 
    class MenuCard {
        constructor(src, alt, title, price, desc, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.price = price;
            this.classes = classes;
            this.desc = desc;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item'
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src = "${this.src}" alt = "${this.alt}">
                    <h3 class = "menu__item-subtitle">${this.title}</h3>
                    <div class = "menu__item-descr">${this.desc}</div>
                    <div class = "menu__item-divider"></div>
                    <div class = "menu__item-price">
                        <div class = "menu__item-cost" > Цена: </div>
                        <div class = "menu__item-total"><span>${this.price}</span> грн/день </div>
                    </div>
                `
            this.parent.append(element);
        }
    }


    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        111,
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        222,
        'Меню "Премиум" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        333,
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '.menu .container',
        'menu__item'
    ).render();
});